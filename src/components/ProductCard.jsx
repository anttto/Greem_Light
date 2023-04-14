import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, product: { productId, url, title, description, liked } }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/artworks/${productId}`);
      }}
      className="artCard w-full cursor-pointer rounded-lg overflow-hidden bg-gray-100 shadow-md"
    >
      <div className="w-full max-h-60 h-60 overflow-hidden relative flex flex-col items-center justify-center">
        <img className="sm:max-w-md max-h-screen" src={url} alt={title} />
      </div>
      <div className="text-left p-3 ">
        <h3 className="font-semibold text-md mb-1">{title}</h3>
        <p className="line-clamp-2 text-sm text-gray-600 h-10">{description}</p>
        {/* <p>{type}</p> */}
        <p className="mt-1">🍐 {liked}</p>
      </div>
    </li>
  );
}
