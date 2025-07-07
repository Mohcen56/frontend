// app/page.tsx

import { getProducts } from '@/lib/api'
import ProductCarousel from '@/components/ProductCarousel'

export default async function Page() {
  const products = await getProducts();

  return (
    <main className="p-2">
      <h1 className="text-[45px] text-center font-avenir-book mt-10 mb-5">Product List</h1>
      <ProductCarousel products={products} />
    </main>
  );
}
