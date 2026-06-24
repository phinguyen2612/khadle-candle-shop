import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display"
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "City Memory Candles | Nen thom ky uc thanh pho",
  description:
    "Website MVP ban nen thom handmade theo concept ky uc thanh pho, lay du lieu san pham tu Google Sheet CSV.",
  openGraph: {
    title: "City Memory Candles",
    description: "Nen thom luu giu ky uc thanh pho.",
    images: ["/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={cn(display.variable, sans.variable, "font-sans antialiased")}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
