import { NotificationActivity } from "../hooks/useNotifications";
import client, { getFailedResponse, processResponse } from "./client";

export const endpoint = "/notifications";

const create = async (activity: NotificationActivity) => {
  try {
    return processResponse(await client.post(endpoint, activity));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const get = (userId: string) => client.get(`${endpoint}/${userId}`);

const markAsRead = (notificationId: string) =>
  client.patch(`${endpoint}/${notificationId}`, { read: true });

export default { create, get, markAsRead };
