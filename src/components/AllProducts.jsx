import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getAllArtwork } from "../api/firebase";

export default function Products() {
  const { isLoading, error, data: products } = useQuery(["artwork"], () => getAllArtwork(), { staleTime: 1000 * 180, cacheTime: 1000 * 300 });
  return (
    <section className="py-2 max-w-screen-xl mx-auto">
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {products && (
        <ul className="artCardWrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-4 py-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
}
