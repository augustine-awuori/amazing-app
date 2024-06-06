import React from "react";

import { Badge } from "..";
import "./typesList.css";

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
    <section className="flex mt-3 relative overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary pl-3">
      <section className="whitespace-nowrap">
        {badges.map((badge) => (
          <Badge
            {...badge}
            key={badge._id}
            onClick={onTypeSelect}
            selectedType={selectedType}
          />
        ))}
      </section>
    </section>
  );
};

export default HorizontallyScrollableBadges;
