export type ProductStatus = "in_stock" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  city: string;
  scent: string;
  price: number;
  volume: string;
  description: string;
  detail: string;
  imageUrl: string;
  status: ProductStatus;
  orderUrl?: string;
  isFeatured: boolean;
};
