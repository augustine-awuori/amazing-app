import { createContext } from "react";

interface ContextValue {
  showDrawer: boolean;
  setShowDrawer: (showDrawer: boolean) => void;
}

const ShowDrawerContext = createContext<ContextValue>({
  showDrawer: false,
  setShowDrawer: () => {},
});

ShowDrawerContext.displayName = "Show Drawer Context";

export default ShowDrawerContext;
