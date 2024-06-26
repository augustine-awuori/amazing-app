import { Dispatch, SetStateAction, createContext } from "react";

interface Type {
  activeChatId: string;
  setActiveChatId: Dispatch<SetStateAction<string>>;
}

const ActiveChatIdContext = createContext<Type>({
  activeChatId: "",
  setActiveChatId: () => {},
});

ActiveChatIdContext.displayName = "Active Chat Context";

export default ActiveChatIdContext;
