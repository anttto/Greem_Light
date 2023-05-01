import React from "react";
import ProductCard from "./ProductCard";
import useArtwork from "../hooks/useArtwork";

export default function Products() {
  const {
    getArtwork: { isLoading, error, data: products },
  } = useArtwork();

  return (
    <section className="py-16 lg:px-0 mx-auto bg-black min-h-screen">
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {products && (
        <ul className="artCardWrap py-4 grid gap-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-1 xl:grid-cols-5 2xl:xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
}
