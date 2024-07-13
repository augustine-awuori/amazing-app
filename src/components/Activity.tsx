import { CgLoadbarSound } from "react-icons/cg";

interface Props {
  item: string;
  onClick: () => void;
}

const Activity = ({ item, onClick }: Props) => {
  return (
    <div
      className="flex items-center border-t border-b border-gray-500 p-2 my-3 cursor-pointer"
      onClick={onClick}
    >
      <CgLoadbarSound size={30} className="mr-2" />
      <p>View {item} activity</p>
    </div>
  );
};

export default Activity;
