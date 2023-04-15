import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewArtwork, getAllArtwork, selectArtwork } from "../api/firebase";

export default function useArtwork(productId) {
  const queryClient = useQueryClient();

  // console.log();
  const getArtwork = useQuery(["artwork", productId], getAllArtwork, { staleTime: 1000 * 60, cacheTime: 1000 * 61 });

  const addArtwork = useMutation(({ uid, product, url }) => addNewArtwork(uid, product, url), {
    onSuccess: () => queryClient.invalidateQueries(["artwork"]),
  });
  // 현재 페이지 Artwork Query 요청

  const { data: editProduct } = useQuery(["artwork", productId], () => selectArtwork(productId), { staleTime: 1000 * 60, cacheTime: 1000 * 61 });

  return { getArtwork, addArtwork, editProduct };
}
