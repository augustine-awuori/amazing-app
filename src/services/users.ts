import client from "./client";

const endpoint = "/users";

const register = (userInfo: object) => client.post(endpoint, userInfo);

export default { register };
