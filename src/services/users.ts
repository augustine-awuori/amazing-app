import auth from "./auth";
import client, { processResponse } from "./client";

const endpoint = "/users";

const register = (userInfo: object) => client.post(endpoint, userInfo);

const updateUserInfo = (userInfo: object) => client.patch(endpoint, userInfo);

const restoreToken = async (email: string) => {
  const res = await client.post("/auth/token", { email });

  if (processResponse(res).ok) auth.loginWithJwt(res.data);
};

export default { register, updateUserInfo, restoreToken };
