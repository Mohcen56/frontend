'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  popularity_score: number;
  weight: number;
  image_yellow: string;
  image_blue: string;
  image_red: string;
  image_green: string;
  image_rose: string;
  image_white: string;
  price: number;
  rating: number;
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  // Filter state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minPopularity, setMinPopularity] = useState(0);

  // Filtering logic
  const filteredProducts = products.filter(
    (product) =>
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (minPopularity === 0
        ? true
        : (typeof product.rating === 'number' && product.rating >= minPopularity))
  );

  return (
    <div>
      {/* Filter UI */}
      <div className="flex gap-4 sm:gap-6 mb-6 relative justify-center">
        {/* Popularity Filter */}
        <details className="group relative">
          <summary
            className="flex items-center gap-2 border-b border-gray-300 pb-1 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 [&::-webkit-details-marker]:hidden"
          >
            <span className="text-sm font-medium"> Popularity </span>
            <span className="transition-transform group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>
          <div
            className="z-50 w-64 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:start-0 group-open:top-8"
          >
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-gray-700">Min Popularity: {minPopularity}</span>
              <button
                type="button"
                className="text-sm text-gray-700 underline transition-colors hover:text-gray-900"
                onClick={() => setMinPopularity(0)}
              >
                Reset
              </button>
            </div>
            <fieldset className="p-3">
              <legend className="sr-only">Popularity</legend>
              <div className="flex flex-col items-start gap-3">
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <label key={score} className="inline-flex items-center gap-3">
                    <input
                      type="radio"
                      className="size-5 rounded border-gray-300 shadow-sm"
                      checked={minPopularity === score}
                      onChange={() => setMinPopularity(score)}
                    />
                    <span className="text-sm font-medium text-gray-700">{score}+</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </details>

        {/* Price Filter */}
        <details className="group relative">
          <summary
            className="flex items-center gap-2 border-b border-gray-300 pb-1 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 [&::-webkit-details-marker]:hidden"
          >
            <span className="text-sm font-medium"> Price </span>
            <span className="transition-transform group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>
          <div className="z-50 w-64 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:start-0 group-open:top-8">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-gray-700">
                {Number.isFinite(maxPrice) ? `Max price is $${maxPrice}` : 'No max price'}
              </span>
              <button
                type="button"
                className="text-sm text-gray-700 underline transition-colors hover:text-gray-900"
                onClick={() => { setMinPrice(0); setMaxPrice(Infinity); }}
              >
                Reset
              </button>
            </div>
            <div className="flex items-center gap-3 p-3">
              <label>
                <span className="text-sm text-gray-700">Min</span>
                <input
                  type="number"
                  value={minPrice === 0 ? '' : minPrice}
                  onChange={e => setMinPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
                />
              </label>
              <label>
                <span className="text-sm text-gray-700">Max</span>
                <input
                  type="number"
                  min={minPrice}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
                />
              </label>
            </div>
          </div>
        </details>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={24}
        centeredSlides={false}
        className="mySwiper"
        style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 40, paddingTop: 80 }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 w-[300px] min-h-[370px] flex flex-col items-center">
                <ProductCard product={product} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}