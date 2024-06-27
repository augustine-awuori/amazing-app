import { LoginInfo } from "../components/LoginForm";
import { RegistrationInfo } from "../components/RegisterForm";
import auth from "./auth";
import client, { processResponse } from "./client";

const endpoint = "/users";

const register = (userInfo: RegistrationInfo) =>
  client.post(endpoint, userInfo);

const login = (userInfo: LoginInfo) => client.post("/auth", userInfo);

const updateUserInfo = (userInfo: object) => client.patch(endpoint, userInfo);

const restoreToken = async (email: string) => {
  const res = await client.post("/auth/token", { email });

  if (processResponse(res).ok) auth.loginWithJwt(res.data);
};

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

export default { login, register, getUser, updateUserInfo, restoreToken };
