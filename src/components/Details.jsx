import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useState } from "react";
import { useEffect } from "react";
import useLiked from "../hooks/useLiked";
import { removeLikedDb, removeProductDb } from "../api/firebase";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [likeCnt, setlikeCnt] = useState(0);
  const [isMyArtwork, setIsMyArtwork] = useState(false);
  const { likedProduct, addLiked, removeLiked, updateLiked, uid, product } = useLiked(); //Query Custom Hook!!!!

  useEffect(() => {
    if (product) {
      setlikeCnt(product.liked);
      setIsMyArtwork(() => product.uid === uid);
    }
  }, [product, uid]);

  const handleLiked = () => {
    if (!likedProduct) {
      return;
    }

    const isLiked = JSON.stringify(likedProduct).includes(product.productId);
    const updatedLikeCnt = isLiked ? likeCnt - 1 : likeCnt + 1;

    setlikeCnt(updatedLikeCnt);

    if (isLiked) {
      removeLiked.mutate({ uid, product });
    } else {
      addLiked.mutate({ uid, product });
    }

    updateLiked.mutate({ likeCnt: updatedLikeCnt, product });
  };

  const removeArtwork = () => {
    removeProductDb(product);
    removeLikedDb(uid, product);
    navigate("/");
  };

  if (product)
    return (
      <section className="p-5 flex flex-col items-center max-w-screen-6xl mx-auto bg-white pb-32">
        <div className="w-full text-center">
          <img className="inline-block artwork-img" src={product.url} alt={product.title} />
        </div>
        <div className="max-w-4xl flex flex-col pt-10 pb-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
          <p className="text-base font-normal mb-6 break-all text-left">{product.description}</p>
        </div>
        <div className="flex max-w-4xl w-full justify-between gap-2 border-t-2 pt-10">
          <div className="flex gap-2">
            {uid && isMyArtwork && <Button text={"수정"} onClick={handleLiked} />}
            {uid && isMyArtwork && <Button text={"삭제"} onClick={removeArtwork} />}
          </div>
          <div className="flex gap-2">
            {uid && <Button text={"좋아요"} onClick={handleLiked} liked={product.liked} />}
            <Button
              text={"뒤로"}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        </div>
      </section>
    );
}
