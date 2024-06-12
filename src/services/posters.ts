import { Poster } from "../hooks/usePosters";
import client, { emptyResponse, processResponse } from "./client";

export const endpoint = "/posters";

const savePoster = async (poster: Poster) => {
  try {
    return processResponse(await client.post(endpoint, poster));
  } catch (error) {
    return emptyResponse;
  }
};

const getPosters = async () => {
  try {
    return processResponse(await client.get(endpoint));
  } catch (error) {
    return emptyResponse;
  }
};

export default { getPosters, savePoster };
