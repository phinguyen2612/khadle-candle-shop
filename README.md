# City Memory Candles

MVP website ban nen thom handmade theo concept ky uc thanh pho. Project dung Next.js App Router, TypeScript, Tailwind CSS, gio hang localStorage va API route noi bo de nhan don hang.

## Kien truc

- `app/`: route pages, layout, API `/api/orders`.
- `components/`: UI dung lai cho san pham, gio hang, checkout va state.
- `context/CartContext.tsx`: quan ly gio hang client-side va localStorage.
- `lib/products.ts`: fetch Google Sheet CSV, parse CSV, fallback sample, format tien VND.
- `lib/orders.ts`: validate order va tao order id gia lap.
- `types/`: Product, CartItem, CustomerInfo, Order.

## Chay local

```bash
npm install
npm run dev
```

Mo `http://localhost:3000`.

## Cau hinh Google Sheet CSV

1. Tao Google Sheet co header:

```text
id,name,city,scent,price,volume,description,detail,image_url,status,order_url,is_featured
```

2. Chon `File > Share > Publish to web`.
3. Chon sheet san pham va format `Comma-separated values (.csv)`.
4. Copy link CSV public.
5. Tao file `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
```

Neu bien moi truong chua co hoac CSV loi, app se dung du lieu mau trong `lib/products.ts`.

## Format status va boolean

- `status`: `in_stock` hoac `out_of_stock`.
- `is_featured`: `true`, `1`, `yes` se duoc hieu la san pham noi bat.

## Dat hang MVP

Checkout goi `POST /api/orders`. API validate du lieu, log don hang ra console va tra ve:

```json
{
  "success": true,
  "orderId": "ORDER-..."
}
```

Sau nay co the thay phan log trong `app/api/orders/route.ts` bang logic ghi Google Sheet, CRM hoac database.
