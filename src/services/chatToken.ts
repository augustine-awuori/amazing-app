import client, {
  emptyResponse,
  processResponse,
  ResponseError,
} from "./client";

export const createAndGetChatToken = async () => {
  try {
    return processResponse(await client.post("/chatToken"));
  } catch (error) {
    return {
      ...emptyResponse,
      problem: (error as ResponseError).response.data.error,
    };
  }
};
