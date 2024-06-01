import { FaUserCircle } from "react-icons/fa";

interface Props {
  alt: string | undefined;
  className?: string | undefined;
  src: string | undefined;
}

const Image = ({ alt, className, src }: Props) => {
  if (!src) return <FaUserCircle className={className} />;

  return (
    <img
      className={`${className} rounded-full w-20 h-20 object-cover border-r-10`}
      alt={alt}
      src={src}
    />
  );
};

export default Image;
