import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function Products() {
  const { isLoading, error, data: products } = useQuery(["products"], () => getProducts());
  return (
    <>
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {products && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4 py-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
