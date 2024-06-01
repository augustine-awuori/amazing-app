import React from "react";

export type ProductType = {
  _id: string;
  label: string;
};

interface Props {
  badges: ProductType[];
  selectedType: ProductType | undefined;
  onTypeSelect: (type: ProductType) => void;
}

const HorizontallyScrollableBadges: React.FC<Props> = ({
  badges,
  onTypeSelect,
  selectedType,
}) => {
  return (
    <section className="flex mt-3 relative">
      <div className="whitespace-nowrap">
        {badges.map((badge) => (
          <article
            key={badge._id}
            onClick={() => onTypeSelect(badge)}
            className={`inline-block mx-2 cursor-pointer`}
          >
            <span
              className={`inline-block ${
                selectedType?._id === badge._id ? "bg-primary" : "bg-gray-200"
              } rounded-full px-3 py-1 text-sm font-semibold text-gray-700`}
            >
              {badge.label}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HorizontallyScrollableBadges;
