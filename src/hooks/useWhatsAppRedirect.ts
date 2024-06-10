import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { appBaseUrl } from "../services/client";
import { funcs } from "../utils";

const useWhatsAppRedirect = (
  phoneNumber: string | number | undefined,
  imageUrl?: string
) => {
  const [url, setUrl] = useState("");
  const location = useLocation();

  const link = funcs.removeLeadingSlash(location.pathname);

  const getUrl = () => {
    const baseUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${appBaseUrl}${link}`;

    return imageUrl ? `${baseUrl}&image=${imageUrl} => ` : baseUrl;
  };

  useEffect(() => {
    if (phoneNumber) setUrl(getUrl());
  }, [phoneNumber, link]);

  return { url };
};

export default useWhatsAppRedirect;
