import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLiked, getMyLikedArtwork } from "../api/firebase";
import ProductCard from "./ProductCard";
import { useAuthContext } from "../context/AuthContext";

export default function MyFvArt() {
  const { uid } = useAuthContext();
  const { data: likedProduct } = useQuery(["like", uid], () => getLiked(uid));
  const { isLoading, error, data: products } = useQuery(["like", likedProduct], () => getMyLikedArtwork(likedProduct));

  return (
    <section className="py-2 px-4 max-w-screen-2xl mx-auto">
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
