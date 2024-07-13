import { useContext } from "react";

import { ShowDrawerContext } from "../contexts";

const useShowDrawer = () => useContext(ShowDrawerContext);

export default useShowDrawer;
