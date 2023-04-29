import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";

export default function ProductCard({ product: { productId, url, title, description, liked, displayName } }) {
  // const { user } = useAuthContext();
  // console.log(displayName);
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/artworks/${productId}`);
      }}
      className="artCard w-full cursor-pointer  lg:rounded-none lg:shadow-none lg:border-none overflow-hidden"
    >
      <div className="img-area">
        {/* <img className="max-w-full h-96" src={url} alt={title} /> */}
        <span className="artimg" style={{ backgroundImage: `url('${url}')` }}></span>
      </div>
      <div className="art-info">
        <h3 className="line-clamp-1 font-semibold text-md mb-1">{title}</h3>
        <p className="line-clamp-1 text-sm text-gray-600 h-5">{description}</p>
        <div className="mt-1 flex justify-between items-center">
          <span className="artist text-sm font-bold text-gray-600">{displayName}</span>
          <span className="liked text-sm font-normal">
            🥦<em className="ml-1 font-bold not-italic">{liked}</em>
          </span>
        </div>
      </div>
    </li>
  );
}
