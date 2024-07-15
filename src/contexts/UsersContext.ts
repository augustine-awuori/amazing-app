import { createContext } from "react";

import { User } from "../hooks/useUser";

export interface UsersContextValue {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const UserContext = createContext<UsersContextValue>({
  users: [],
  setUsers: () => {},
});

UserContext.displayName = "User Context";

export default UserContext;
