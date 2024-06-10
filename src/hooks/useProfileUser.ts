import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { empty } from "../utils";
import { User } from "./useUser";
import ProfileUserContext from "../contexts/ProfileUserContext";
import useReload from "./useReload";
import usersApi from "../services/users";

export default function useProfileUser() {
  const { userId } = useParams();
  const { profileUser, setProfileUser } = useContext(ProfileUserContext);
  const { info, isLoading, request } = useReload<User>(
    null,
    empty.user,
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
    profileUser: profileUser || info || empty.user,
    setProfileUser,
    isLoading,
  };
}
