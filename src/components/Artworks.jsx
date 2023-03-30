import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { getProducts } from "../api/firebase";
// import ProductCard from "./ProductCard";
import { useAuthContext } from "./context/AuthContext";
import { getArtwork } from "../api/firebase";
import ArtworkCard from "./ArtworkCard";

export default function Artworks() {
  const { uid } = useAuthContext();
  const { isLoading, error, data: artworks } = useQuery(["artwork", uid], () => getArtwork(uid));
  return (
    <>
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error...</p>}
      {artworks && (
        <ul className="artCardWrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-4 py-6">
          {artworks.map((product) => (
            <ArtworkCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
