'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  popularity_score: number;
  weight: number;
  image_yellow: string;
  image_rose: string;
  image_white: string;
  price: number;
  rating: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'rose' | 'white'>('yellow');

  const imageMap = {
    yellow: product.image_yellow,
    rose: product.image_rose,
    white: product.image_white,
  };

  // Example: fetch products with price between 100 and 500, popularity >= 2
  useEffect(() => {
    const params = new URLSearchParams({
      min_price: '100',
      max_price: '500',
      min_popularity: '2',
    });
    fetch(`/api/products/?${params}`)
      .then(res => res.json())
      .then(data => {
        // data is the filtered product list
        console.log(data);
      });
  }, []);

  return (
    <div>
      <Image
        src={imageMap[selectedColor]}
        alt={product.name}
        className=" h-48 object-cover rounded-2xl"
        width={400}
        height={200}
      />

      <h2 className="mt-2 text-[15px] font-montserrat-medium">{product.name}</h2>
      <p className="text-gray-700 text-base font-montserrat-regular">${product.price.toFixed(2)}</p>
      <div className="flex space-x-2 mt-3">
        {(['yellow', 'rose', 'white'] as const).map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-white'}`}
            style={{
              backgroundColor:
                color === 'yellow'
                  ? 'var(--yellowgold)'
                  : color === 'rose'
                  ? 'var(--rosegold)'
                  : 'var(--whitegold)',
            }}
            onClick={() => setSelectedColor(color)}
            aria-label={color}
          />
        ))}
      </div>
      {/* Selected color name at the bottom */}
      <div className="mt-0 !text-left ">
        <span
          className="text-[12px] font-avenir-book text-gray-700"
          style={{ fontFamily: 'Avenir-Book, sans-serif', fontSize: 12 }}
        >
          {selectedColor === 'yellow'
            ? 'Yellow Gold'
            : selectedColor === 'rose'
            ? 'Rose Gold'
            : 'White Gold'}
        </span>
      </div>

      <div className="flex items-center space-x-1 mt-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const full = i < Math.floor(product.rating);
          const half = !full && i < product.rating && product.rating % 1 >= 0.25 && product.rating % 1 < 0.75 && i === Math.floor(product.rating);
          return (
            <svg
              key={i}
              className="w-5 h-5"
              viewBox="0 0 20 20"
            >
              {full ? (
                <polygon fill="#E6C9A7" points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
              ) : half ? (
                <g>
                  <defs>
                    <linearGradient id={`half-star-${i}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="#E6C9A7" />
                      <stop offset="50%" stopColor="#E0E0E0" />
                    </linearGradient>
                  </defs>
                  <polygon fill={`url(#half-star-${i})`} points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                </g>
              ) : (
                <polygon fill="#E0E0E0" points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
              )}
            </svg>
          );
        })}
        <span className="ml-2 text-[14px] font- Avenir - Book  text-gray-800">{product.rating.toFixed(1)}/5</span>
      </div>
    </div>
  );
}
