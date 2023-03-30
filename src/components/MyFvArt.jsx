import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLiked } from "../api/firebase";
import ProductCard from "./ProductCard";
import { useAuthContext } from "./context/AuthContext";

export default function MyFvArt() {
  const { uid } = useAuthContext();
  const { isLoading, error, data: liked } = useQuery(["liked", uid], () => getLiked(uid));

  return (
    <>
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {liked && (
        <ul className="artCardWrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4 py-6">
          {liked.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
