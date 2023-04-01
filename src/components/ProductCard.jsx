import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, product: { productId, url, type, title, description, liked } }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${productId}`, { state: { product } });
      }}
      className="artCard w-full bg-gray-100 border cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="w-full h-4/6 overflow-hidden relative flex items-center justify-center">
        <img className=" max-w-6xl max-h-full" src={url} alt={title} />
      </div>
      <div className="text-left p-4">
        <h3>{title}</h3>
        <p className="line-clamp-2">{description}</p>
        <p>{type}</p>
        <p>{liked}</p>
      </div>
    </li>
  );
}
