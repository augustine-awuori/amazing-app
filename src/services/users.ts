import auth from "./auth";
import client, { processResponse } from "./client";
import { LoginInfo } from "../components/EmergencyLoginForm";

const endpoint = "/users";

interface RegistrationInfo extends LoginInfo {
  avatar: string;
  isAccountVerified: boolean;
}

const register = (userInfo: RegistrationInfo) =>
  client.post(endpoint, userInfo);

const updateUserInfo = (userInfo: object) => client.patch(endpoint, userInfo);

const restoreToken = async (email: string) => {
  const res = await client.post("/auth/token", { email });

  if (processResponse(res).ok) auth.loginWithJwt(res.data);
};

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

export default { register, getUser, updateUserInfo, restoreToken };
