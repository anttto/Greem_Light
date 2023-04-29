import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewArtwork, getAllArtwork, removeLikedDb, removeProductDb, updateArtwork } from "../api/firebase";

export default function useArtwork(productId) {
  const queryClient = useQueryClient();

  // 모든 그림 Query 요청
  const getArtwork = useQuery(["artwork"], getAllArtwork, { staleTime: 1000 * 60, cacheTime: 1000 * 60 });

  // Artwork - 추가(Add) 갱신
  const addArtwork = useMutation(({ user, uid, product, url }) => addNewArtwork(user, uid, product, url), {
    onSuccess: () => queryClient.invalidateQueries(["artwork"]),
  });

  // Artwork - 수정(Update) 갱신
  const modifyArtwork = useMutation(({ editArtwork }) => updateArtwork(editArtwork), {
    onSuccess: () => queryClient.invalidateQueries(["artwork"]),
  });

  // Artwork - 삭제(Remove) 갱신
  const removeArtwork = useMutation(({ product }) => removeProductDb(product), {
    onSuccess: () => queryClient.invalidateQueries(["artwork"]),
  });

  // Artwork - 그림 삭제할 때 Liked DB 에서도 삭제(Remove) 갱신
  const removeLike = useMutation(({ uid, product }) => removeLikedDb(uid, product), {
    onSuccess: () => queryClient.invalidateQueries(["artwork"]),
  });

  return { getArtwork, addArtwork, removeArtwork, removeLike, modifyArtwork };
}
