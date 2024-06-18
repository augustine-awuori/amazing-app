import { useState } from "react";
import { FaClipboard } from "react-icons/fa";

import BottomToast from "./BottomToast";

interface Props {
  label?: string;
}

const CopyUrlButton = ({ label }: Props) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      },
      () => {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
      }
    );
  };

  return (
    <section className="relative">
      <button
        className="btn btn-ghost btn-xs flex items-center justify-center"
        onClick={handleCopyUrl}
      >
        <FaClipboard />
        <span className="ml-2">Copy {label} URL</span>
      </button>
      {showSuccessToast && <BottomToast type="success" />}
      {showErrorToast && <BottomToast type="error" />}
    </section>
  );
};

export default CopyUrlButton;
