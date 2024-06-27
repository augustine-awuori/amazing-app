import { createContext } from "react";

interface ContextValue {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

const ShowNavContext = createContext<ContextValue>({
  showNav: false,
  setShowNav: () => {},
});

ShowNavContext.displayName = "Show Nav Context";

export default ShowNavContext;
