import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewArtwork, getAllArtwork } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useArtwork() {
  const { uid } = useAuthContext();

  const queryClient = useQueryClient();

  const getArtwork = useQuery(["artwork"], getAllArtwork, { cacheTime: 1000 * 60 });

  const addArtwork = useMutation(({ product, url }) => addNewArtwork(uid, product, url), {
    onSuccess: () => queryClient.invalidateQueries(["artwork"]),
  });

  return { getArtwork, addArtwork };
}
