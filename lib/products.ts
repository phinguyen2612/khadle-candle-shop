import type { Product, ProductStatus } from "@/types/product";

const fallbackImage = "/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg";

export const fallbackProducts: Product[] = [
  {
    id: "can-tho-memory",
    name: "Cần Thơ Memory Candle",
    city: "Cần Thơ",
    scent: "Lúa non, hoa bưởi, gió sông",
    price: 199000,
    volume: "200ml",
    description: "Một ngọn nến dịu dàng gợi nhớ những buổi chiều trên bến Ninh Kiều.",
    detail:
      "Cần Thơ Memory Candle mở ra bằng hương lúa non và hoa bưởi, sau đó dịu lại với chút ấm áp của gỗ tuyết tùng. Phù hợp cho những khoảnh khắc chậm, đọc sách, viết nhật ký hoặc tặng người yêu miền Tây.",
    imageUrl: fallbackImage,
    status: "in_stock",
    orderUrl: "",
    isFeatured: true
  },
  {
    id: "sai-gon-night",
    name: "Sài Gòn Night Candle",
    city: "Sài Gòn",
    scent: "Cà phê đen, amber, mưa đêm",
    price: 229000,
    volume: "220ml",
    description: "Ấm, sâu và có chút náo nhiệt như thành phố sau cơn mưa.",
    detail:
      "Sài Gòn Night Candle kết hợp note cà phê đen, amber và hương mưa đêm nhẹ. Mùi hương có độ sâu vừa đủ, hợp với phòng làm việc, buổi tối nghe nhạc hoặc một món quà có cá tính.",
    imageUrl: fallbackImage,
    status: "in_stock",
    orderUrl: "",
    isFeatured: true
  },
  {
    id: "da-lat-mist",
    name: "Đà Lạt Mist Candle",
    city: "Đà Lạt",
    scent: "Thông xanh, lavender, sương sớm",
    price: 219000,
    volume: "200ml",
    description: "Lạnh nhẹ, sạch và mỏng như lớp sương qua đồi thông.",
    detail:
      "Đà Lạt Mist Candle mang hương thông xanh, lavender và chút musk mềm. Mùi hương nhẹ nhàng, thanh khiết, phù hợp cho phòng ngủ, thiền, yoga hoặc những ngày cần bình yên.",
    imageUrl: fallbackImage,
    status: "out_of_stock",
    orderUrl: "",
    isFeatured: true
  }
];

export function parseBoolean(value: string | boolean | undefined) {
  if (typeof value === "boolean") return value;
  return ["true", "1", "yes", "y"].includes(String(value ?? "").trim().toLowerCase());
}

export function formatCurrencyVND(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(price);
}

export function parseCSV(csv: string) {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  row.push(current.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function normalizeProduct(record: Record<string, string>): Product {
  const status = record.status === "out_of_stock" ? "out_of_stock" : "in_stock";

  return {
    id: record.id,
    name: record.name,
    city: record.city,
    scent: record.scent,
    price: Number(record.price) || 0,
    volume: record.volume,
    description: record.description,
    detail: record.detail,
    imageUrl: record.image_url || fallbackImage,
    status: status as ProductStatus,
    orderUrl: record.order_url,
    isFeatured: parseBoolean(record.is_featured)
  };
}

export async function getProducts(): Promise<Product[]> {
  const csvUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL;

  if (!csvUrl) return fallbackProducts;

  try {
    const response = await fetch(csvUrl, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("Không thể tải CSV sản phẩm");

    const csv = await response.text();
    const rows = parseCSV(csv);
    const [headers, ...dataRows] = rows;
    if (!headers?.length) return fallbackProducts;

    const products = dataRows
      .map((values) =>
        headers.reduce<Record<string, string>>((record, header, index) => {
          record[header.trim()] = values[index] ?? "";
          return record;
        }, {})
      )
      .filter((record) => record.id && record.name)
      .map(normalizeProduct);

    return products.length ? products : fallbackProducts;
  } catch (error) {
    console.error("Product CSV fallback:", error);
    return fallbackProducts;
  }
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find((product) => product.id === id) ?? null;
}
