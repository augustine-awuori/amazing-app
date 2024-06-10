import { useContext, useEffect } from "react";

import { StatusContext } from "../contexts";
import useData from "./useData";

const endpoint = "/status";

export interface Status {
  _id: string;
  color: string;
  label: string;
}

const useStatus = () => {
  const { status, setStatus } = useContext(StatusContext);
  const { data, error, isLoading } = useData<Status>(endpoint);

  useEffect(() => {
    if (!error) setStatus(data);
  }, [data?.length]);

  return { status: [{ _id: "", label: "All" }, ...status], error, isLoading };
};

export default useStatus;
