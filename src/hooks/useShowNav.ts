import { useContext } from "react";

import { ShowNavContext } from "../contexts";

const useShowNav = () => useContext(ShowNavContext);

export default useShowNav;
