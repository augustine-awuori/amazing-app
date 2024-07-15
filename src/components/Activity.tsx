import { CgLoadbarSound } from "react-icons/cg";

interface Props {
  count: number;
  item: string;
  onClick: () => void;
}

const Activity = ({ count, item, onClick }: Props) => {
  return (
    <div
      className="flex items-center border-t border-b border-gray-500 p-2 my-3 cursor-pointer"
      onClick={onClick}
    >
      <CgLoadbarSound size={30} className="mr-2" />
      <p>
        {count} {item.replace(item.charAt(0), item.charAt(0).toUpperCase())}{" "}
        activit{count === 1 ? "y" : "ies"}
      </p>
    </div>
  );
};

export default Activity;
