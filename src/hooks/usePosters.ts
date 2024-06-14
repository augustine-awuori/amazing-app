import { useContext, useEffect } from "react";

import { endpoint } from "../services/posters";
import { PostersContext } from "../contexts";
import useData from "./useData";

export interface Poster {
  image: string;
}

const usePosters = () => {
  const { data: posters, ...rest } = useData<Poster>(endpoint);
  const { setPosters, posters: retrieved } = useContext(PostersContext);

  useEffect(() => {
    if (!retrieved.length) setPosters(posters?.length ? posters : []);
  }, [posters?.length, retrieved.length]);

  return { posters, ...rest };
};

export default usePosters;
