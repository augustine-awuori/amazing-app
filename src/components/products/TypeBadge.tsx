import { ProductType } from "./TypesList";

interface Props extends ProductType {
  isSeleted?: boolean;
  onClick: (badge: ProductType) => void;
  selectedType: ProductType | undefined;
}

const TypeBadge = ({ isSeleted, onClick, selectedType, ...badge }: Props) => {
  const active = isSeleted || selectedType?._id === badge._id;
  return (
    <article
      onClick={() => onClick(badge)}
      className={`inline-block mx-2 cursor-pointer`}
    >
      <span
        className={`inline-block ${
          active ? "bg-primary" : "bg-gray-200"
        } rounded-full px-3 py-1 text-sm font-semibold ${
          active ? "text-white" : "text- gray-700"
        }`}
      >
        {badge.label}
      </span>
    </article>
  );
};

export default TypeBadge;
