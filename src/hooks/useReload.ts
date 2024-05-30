import { useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

interface InfoStructure {
  paramsId: string;
}

export default function useReload<T>(
  prevInfo: T | undefined | null,
  infoStructure: InfoStructure & T,
  apiFunc: (id: string) => Promise<AxiosResponse>
) {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const params = useParams();

  const request = async () => {
    if (prevInfo) return;

    const id = params[infoStructure.paramsId];
    if (!id) return (window.location.href = "/");

    try {
      setLoading(true);
      const { data } = await apiFunc(id);
      setLoading(false);
      setData(data as T);
    } catch (error) {
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  const info: T = prevInfo || data || infoStructure;

  return { info, isLoading, request };
}
