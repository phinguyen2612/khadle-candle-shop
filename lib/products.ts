import type { Product, ProductStatus } from "@/types/product";

const fallbackImage = "/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg";

export const fallbackProducts: Product[] = [
  {
    id: "can-tho-memory",
    name: "Can Tho Memory Candle",
    city: "Can Tho",
    scent: "Lua non, hoa buoi, gio song",
    price: 199000,
    volume: "200ml",
    description: "Mot ngon nen diu dang goi nho nhung buoi chieu tren ben Ninh Kieu.",
    detail:
      "Can Tho Memory Candle mo ra bang huong lua non va hoa buoi, sau do diu lai voi chut am ap cua go tuyet tung. Phu hop cho nhung khoanh khac cham, doc sach, viet nhat ky hoac tang nguoi yeu mien Tay.",
    imageUrl: fallbackImage,
    status: "in_stock",
    orderUrl: "",
    isFeatured: true
  },
  {
    id: "sai-gon-night",
    name: "Sai Gon Night Candle",
    city: "Sai Gon",
    scent: "Ca phe den, amber, mua dem",
    price: 229000,
    volume: "220ml",
    description: "Am, sau va co chut nao nhiet nhu thanh pho sau con mua.",
    detail:
      "Sai Gon Night Candle ket hop note ca phe den, amber va huong mua dem nhe. Mui huong co do sau vua du, hop voi phong lam viec, buoi toi nghe nhac hoac mot mon qua co ca tinh.",
    imageUrl: fallbackImage,
    status: "in_stock",
    orderUrl: "",
    isFeatured: true
  },
  {
    id: "da-lat-mist",
    name: "Da Lat Mist Candle",
    city: "Da Lat",
    scent: "Thong xanh, lavender, suong som",
    price: 219000,
    volume: "200ml",
    description: "Lanh nhe, sach va mong nhu lop suong qua doi thong.",
    detail:
      "Da Lat Mist Candle mang huong thong xanh, lavender va chut musk mem. Mui huong nhe nha, thanh khiet, phu hop cho phong ngu, thien, yoga hoac nhung ngay can binh yen.",
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
    if (!response.ok) throw new Error("Cannot fetch product CSV");

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
