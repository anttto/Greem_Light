import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { useAuthContext } from "./context/AuthContext";
import { getMyArtwork } from "../api/firebase";

export default function Products() {
  const { uid } = useAuthContext();
  const { isLoading, error, data: products } = useQuery(["artwork", uid], () => getMyArtwork(uid));
  return (
    <>
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {products && (
        <ul className="artCardWrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4 py-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
