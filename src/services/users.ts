import client from "./client";

const endpoint = "/users";

const register = (userInfo: object) => client.post(endpoint, userInfo);

const updateUserInfo = (userInfo: object) => client.patch(endpoint, userInfo);

export default { register, updateUserInfo };
