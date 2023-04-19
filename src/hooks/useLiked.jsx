import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLikedProduct, getLiked, removeLikedProduct, selectArtwork, updateLikeCount } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useLiked() {
  const { uid } = useAuthContext();
  const { productId } = useParams();
  const queryClient = useQueryClient();

  // Liked Query 요청
  const { data: likedProduct } = useQuery(["like", uid], () => getLiked(uid));

  // Liked DB목록 추가 상태 갱신
  const addLiked = useMutation(({ uid, product }) => addLikedProduct(uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["like", uid]);
    },
  });

  // Liked DB목록 삭제 상태 갱신
  const removeLiked = useMutation(({ uid, product }) => removeLikedProduct(uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["like", uid]);
    },
  });

  // 현재 페이지 Artwork Query 요청
  const { data: product } = useQuery(["artwork", productId], () => selectArtwork(productId));

  // Artwork에 Liked 개수 상태 갱신
  const updateLiked = useMutation(({ likeCnt, product }) => updateLikeCount(likeCnt, product), {
    onSuccess: () => {
      return queryClient.invalidateQueries(["artwork"]);
    },
  });

  return { likedProduct, removeLiked, addLiked, product, updateLiked, uid };
}
