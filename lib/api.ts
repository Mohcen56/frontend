// lib/api.ts

// This fetches products from your backend API
export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/`, {
    cache: 'no-store', // disables caching to always get fresh price
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  return res.json();
}

