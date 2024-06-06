import { ChangeEvent } from "react";
import { FaCamera } from "react-icons/fa";

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  visible?: boolean;
}

const ImagePicker = ({ onChange, visible = true }: Props) =>
  visible ? (
    <div className="border border-gray-300 rounded-md w-24 h-24 flex items-center justify-center relative overflow-hidden mb-2 mr-2">
      <input
        type="file"
        accept="image/*"
        multiple
        className="opacity-0 absolute w-full h-full cursor-pointer"
        style={{ zIndex: 10 }}
        onChange={onChange}
      />
      <FaCamera className="text-gray-600" size={24} />
    </div>
  ) : null;

export default ImagePicker;
