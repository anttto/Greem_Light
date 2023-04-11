import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, product: { productId, url, title, description, liked } }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${productId}`);
      }}
      className="artCard w-full cursor-pointer rounded-lg overflow-hidden bg-gray-100"
    >
      <div className="w-full h-3/6 overflow-hidden relative flex flex-col items-center justify-center">
        <img className="sm:max-w-md max-h-screen" src={url} alt={title} />
      </div>
      <div className="text-left p-4 h-3/6 ">
        <h3>{title}</h3>
        <p className="line-clamp-2">{description}</p>
        {/* <p>{type}</p> */}
        <p>{liked}</p>
      </div>
    </li>
  );
}
