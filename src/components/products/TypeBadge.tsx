import { ProductType } from "./TypesList";

interface Props extends ProductType {
  isSeleted?: boolean;
  onClick: (badge: ProductType) => void;
  selectedType: ProductType | undefined;
}

const TypeBadge = ({ isSeleted, onClick, selectedType, ...badge }: Props) => (
  <article
    onClick={() => onClick(badge)}
    className={`inline-block mx-2 cursor-pointer`}
  >
    <span
      className={`inline-block ${
        isSeleted || selectedType?._id === badge._id
          ? "bg-primary"
          : "bg-gray-200"
      } rounded-full px-3 py-1 text-sm font-semibold text-gray-700`}
    >
      {badge.label}
    </span>
  </article>
);

export default TypeBadge;
