import React, { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addLikedProduct, getLiked, removeLikedProduct, selectArtwork, updateLikeCount } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import Button from "./ui/Button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ProductDetail() {
  const { productId } = useParams();
  const { uid } = useAuthContext();
  const navigate = useNavigate();

  const { data: product } = useQuery(["artwork", productId], () => selectArtwork(productId));
  const { data: likedProduct } = useQuery(["like", uid], () => getLiked(uid));

  const [likeCnt, setlikeCnt] = useState(0);

  useEffect(() => {
    if (product) {
      setlikeCnt(product.liked);
    }
  }, [product]);

  const queryClient = useQueryClient();
  const updateLiked = useMutation(({ likeCnt, product }) => updateLikeCount(likeCnt, product), {
    onSuccess: () => {
      return queryClient.invalidateQueries(["artwork", productId]);
    },
  });

  const removeLiked = useMutation(({ uid, product }) => removeLikedProduct(uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["like", uid]);
    },
  });

  const addLiked = useMutation(({ uid, product }) => addLikedProduct(uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["like", uid]);
    },
  });

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

  if (product)
    return (
      <section className="p-5 flex flex-col items-center max-w-screen-6xl mx-auto bg-white pb-32">
        <div className="w-full text-center">
          <img className="inline-block artwork-img" src={product.url} alt={product.title} />
        </div>
        <div className="max-w-4xl flex flex-col pt-10 pb-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
          {/* {type && <span className="text-sm mb-6 text-gray-500">-{type}-</span>} */}
          <p className="text-base font-normal mb-6 break-all text-left">{product.description}</p>
          {/* <p>{liked}</p> */}
        </div>
        <div className="flex max-w-4xl w-full justify-center gap-2 border-t-2 pt-10">
          {uid && <Button text={"좋아요"} onClick={handleLiked} liked={product.liked} />}
          <Button
            text={"뒤로"}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </section>
    );
}
