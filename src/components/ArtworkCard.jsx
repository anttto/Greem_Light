import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArtworkCard({ artwork, artwork: { id, price, url, options, type, title, category, description } }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { artwork } });
      }}
      className="artCard w-full h-96 bg-gray-100 border cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="w-full h-4/6 overflow-hidden relative">
        <img className="max-w-md h-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={url} alt={title} />
      </div>
      <div className="text-left p-4">
        <h3>{title}</h3>
        <p className="line-clamp-2">{description}</p>
        <p>{type}</p>
      </div>
    </li>
  );
}
