import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { User } from "./useUser";
import ProfileUserContext from "../contexts/ProfileUserContext";
import useReload from "./useReload";
import usersApi from "../services/users";
import { emptyAuthor } from "../utils/empty";

export default function useProfileUser() {
  const { userId } = useParams();
  const { setProfileUser } = useContext(ProfileUserContext);
  const { info, isLoading, request } = useReload<User>(
    null,
    { ...emptyAuthor, paramsId: "userId" },
    usersApi.getUser
  );

  useEffect(() => {
    initUser();
  }, [userId]);

  async function initUser() {
    await request();
    setProfileUser(info);
  }

  return {
    profileUser: info,
    setProfileUser,
    isLoading,
  };
}
