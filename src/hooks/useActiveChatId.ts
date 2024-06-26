import { useContext } from "react";

import { ActiveChatIdContext } from "../contexts";

const useActiveChatId = () => useContext(ActiveChatIdContext);

export default useActiveChatId;
