import React from "react";
import ProductCard from "./ProductCard";
import useArtwork from "../hooks/useArtwork";

export default function Products() {
  const {
    getArtwork: { isLoading, error, data: artworks },
  } = useArtwork();

  return (
    <section className="py-2 px-4 max-w-screen-2xl mx-auto">
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {artworks && (
        <ul className="artCardWrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 gap-y-6 py-6">
          {artworks.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
}
