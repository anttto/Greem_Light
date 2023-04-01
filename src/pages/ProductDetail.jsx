import React from "react";
// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addLikedProduct } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const navigate = useNavigate();
  const {
    state: {
      product: { productId, url, type, title, description, liked },
    },
  } = useLocation();
  // const [selected, setSelected] = useState(options && options[0]);
  // const handleSelect = (e) => setSelected(e.target.value);

  const handleLiked = () => {
    const product = { productId, url, type, title, description, liked };
    addLikedProduct(uid, product);
  };
  return (
    <section className="p-5 flex flex-col max-w-7xl mx-auto bg-white">
      <div className="w-full text-center">
        <img className="inline-block" src={url} alt={title} />
      </div>
      <div className="w-full flex flex-col p-10 text-center">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{type}</p>
        <p>{liked}</p>
      </div>
      <div className="flex justify-between w-44 mx-auto">
        <Button text={"좋아요"} onClick={handleLiked} />
        <Button
          text={"목록으로"}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </section>
  );
}
