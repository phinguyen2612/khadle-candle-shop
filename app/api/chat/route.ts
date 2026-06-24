import { NextResponse } from "next/server";
import { formatCurrencyVND, getProducts, ORIGINAL_PRODUCT_PRICE } from "@/lib/products";
import type { ChatMessage } from "@/types/chat";
import type { Product } from "@/types/product";

const maxMemoryMessages = 6;

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") return false;
      const record = message as Record<string, unknown>;
      return (
        (record.role === "user" || record.role === "assistant") &&
        typeof record.content === "string" &&
        record.content.trim().length > 0
      );
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1000)
    }))
    .slice(-maxMemoryMessages);
}

function buildProductContext(products: Product[]) {
  return products
    .map((product) => {
      const status = product.status === "in_stock" ? "còn hàng" : "hết hàng";
      return [
        `Tên: ${product.name}`,
        `Mã: ${product.id}`,
        `Thành phố: ${product.city}`,
        `Mùi hương: ${product.scent}`,
        `Giá gốc: ${formatCurrencyVND(ORIGINAL_PRODUCT_PRICE)}`,
        `Giá bán hiện tại: ${formatCurrencyVND(product.price)}`,
        `Dung tích: ${product.volume}`,
        `Trạng thái: ${status}`,
        `Mô tả ngắn: ${product.description}`,
        `Chi tiết: ${product.detail}`
      ].join("\n");
    })
    .join("\n\n---\n\n");
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function getFallbackReply(question: string, products: Product[]) {
  const query = normalizeSearchText(question);
  const matchedProducts = products.filter((product) => {
    const searchable = [product.name, product.city, product.scent, product.description, product.detail]
      .join(" ")
      .toLowerCase();
    const normalizedSearchable = normalizeSearchText(searchable);
    return normalizedSearchable.includes(query) || query.includes(normalizeSearchText(product.city));
  });

  const productsToShow = matchedProducts.length ? matchedProducts : products.slice(0, 3);

  if (query.includes("gia") || query.includes("bao nhieu")) {
    return productsToShow
      .map(
        (product) =>
          `${product.name}: giá gốc ${formatCurrencyVND(ORIGINAL_PRODUCT_PRICE)}, hiện còn ${formatCurrencyVND(product.price)} (${product.volume}, ${
            product.status === "in_stock" ? "còn hàng" : "hết hàng"
          }).`
      )
      .join("\n");
  }

  if (query.includes("con hang") || query.includes("het hang") || query.includes("stock")) {
    return productsToShow
      .map(
        (product) =>
          `${product.name} hiện ${product.status === "in_stock" ? "còn hàng" : "hết hàng"}.`
      )
      .join("\n");
  }

  return `Mình có thể tư vấn dựa trên dữ liệu sản phẩm hiện có:\n${productsToShow
    .map(
      (product) =>
        `- ${product.name}: ${product.scent}, giá gốc ${formatCurrencyVND(ORIGINAL_PRODUCT_PRICE)}, hiện còn ${formatCurrencyVND(product.price)}, ${
          product.status === "in_stock" ? "còn hàng" : "hết hàng"
        }.`
    )
    .join("\n")}\nBạn muốn mình tư vấn theo mùi hương, thành phố hay ngân sách?`;
}

function extractResponseText(data: unknown) {
  const record = data as Record<string, unknown>;
  if (typeof record.output_text === "string") return record.output_text;

  const output = record.output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      const content = (item as Record<string, unknown>).content;
      return Array.isArray(content) ? content : [];
    })
    .map((contentItem) => {
      const item = contentItem as Record<string, unknown>;
      return typeof item.text === "string" ? item.text : "";
    })
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = normalizeMessages(body.messages);
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập nội dung cần tư vấn." },
        { status: 400 }
      );
    }

    const products = await getProducts();
    const productContext = buildProductContext(products);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        reply: getFallbackReply(latestUserMessage.content, products),
        source: "fallback"
      });
    }

    const systemPrompt = [
      "Bạn là trợ lý tư vấn bán hàng của City Memory Candles.",
      "Chỉ được trả lời dựa trên dữ liệu sản phẩm được cung cấp bên dưới.",
      "Không bịa giá, tồn kho, khuyến mãi, chính sách vận chuyển hoặc thông tin ngoài dữ liệu.",
      "Nếu dữ liệu không có câu trả lời, hãy nói rõ rằng shop chưa cung cấp thông tin đó và gợi ý khách để lại thông tin liên hệ.",
      "Trả lời bằng tiếng Việt, ngắn gọn, thân thiện, phù hợp khách mua nến thơm.",
      "Bộ nhớ hội thoại chỉ gồm 3 lượt gần nhất do hệ thống gửi kèm.",
      "",
      "DỮ LIỆU SẢN PHẨM:",
      productContext
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.2-mini",
        instructions: systemPrompt,
        input: messages.map((message) => ({ role: message.role, content: message.content }))
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI chat error:", data);
      return NextResponse.json(
        { success: false, message: "Chatbot hiện chưa thể trả lời. Vui lòng thử lại sau." },
        { status: 502 }
      );
    }

    const reply = extractResponseText(data).trim();
    return NextResponse.json({
      success: true,
      reply:
        reply ||
        "Mình chưa tìm thấy thông tin phù hợp trong dữ liệu sản phẩm. Bạn có thể hỏi về tên nến, mùi hương, giá hoặc tình trạng còn hàng."
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xử lý tin nhắn lúc này." },
      { status: 500 }
    );
  }
}
