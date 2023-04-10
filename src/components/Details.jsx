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

  const { data: product } = useQuery(["like", productId], () => selectArtwork(productId));
  const { data: likedProduct } = useQuery(["like", uid], () => getLiked(uid));

  // const component = () => {
  //   if (product) {
  //     return product.liked;
  //   }
  // };

  const [likeCnt, setlikeCnt] = useState(0);

  const queryClient = useQueryClient();
  const updateLiked = useMutation(({ likeCnt, product }) => updateLikeCount(likeCnt, product), {
    onSuccess: () => {
      return queryClient.invalidateQueries(["like", productId]);
    },
  });

  const removeLiked = useMutation(({ uid, product }) => removeLikedProduct(uid, product), {
    onSuccess: () => {
      console.log("1: removeLikedProduct");
      queryClient.invalidateQueries(["like", uid]);
    },
  });

  const addLiked = useMutation(({ uid, product }) => addLikedProduct(uid, product), {
    onSuccess: () => {
      console.log("2: addLikedProduct");
      queryClient.invalidateQueries(["like", uid]);
    },
  });

  const handleLiked = () => {
    if (likedProduct) {
      let boolean = false;
      boolean = JSON.stringify(likedProduct).includes(product.productId);

      if (boolean === true) {
        removeLiked.mutate({ uid, product });
        setlikeCnt((prev) => prev - 1);
      } else {
        addLiked.mutate({ uid, product });
        setlikeCnt((prev) => prev + 1);
      }
      // console.log(likeCnt);
    }
    updateLiked.mutate(
      { likeCnt, product },
      {
        onSuccess: () => {
          console.log(likeCnt);
          console.log(product);
          console.log("invalidated");
        },
      }
    );
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
