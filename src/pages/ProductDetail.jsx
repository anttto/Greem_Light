import React from "react";
// import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addLikedProduct } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  const { uid } = useAuthContext();

  const {
    state: {
      product: { id, url, type, title, description },
    },
  } = useLocation();
  // const [selected, setSelected] = useState(options && options[0]);
  // const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = () => {
    const product = { id, url, title, type, description };
    addLikedProduct(uid, product);
  };
  return (
    <section className="p-5 flex flex-col">
      <div className="w-full px-4 ">
        <img className="inline-block" src={url} alt={title} />
      </div>
      <div className="w-full flex flex-col p-10 text-center">
        <h3>{title}</h3>
        <p>{description}</p>
        {/* <p>{category}</p> */}
        <p>{type}</p>
        {/* <select value={selected} onChange={handleSelect} className="w-32 mx-auto">
          {options && options.map((option, index) => <option key={index}>{option}</option>)}
        </select> */}
      </div>
      <div className="w-32 mx-auto">
        <Button text="좋아요 누르기" onClick={handleClick} />
      </div>
    </section>
  );
}
