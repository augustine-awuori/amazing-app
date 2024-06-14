import client, { processResponse } from "./client";

export const createAndGetChatToken = async () => {
  try {
    return processResponse(await client.post("/chatToken"));
  } catch (error) {}
};
