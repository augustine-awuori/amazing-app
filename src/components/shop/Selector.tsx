import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";

import { Shop } from "../../hooks/useShop";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  onClick: () => void;
  selected: boolean;
  shop: Shop;
}

const Selector = ({ onClick, selected, shop }: Props) => {
  return (
    <article
      className="flex cursor-pointer items-center my-2"
      onClick={onClick}
    >
      {selected ? (
        <IoIosRadioButtonOn className="mr-2" />
      ) : (
        <IoIosRadioButtonOff className="mr-2" />
      )}
      <img
        src={shop.image}
        alt={shop.name}
        className="rounded-full w-9 h-9 mr-2 object-cover"
      />
      <section className="">
        <p className="text-white">{shop.name}</p>
        <p className="text-sm">{shop.location}</p>
      </section>
      <BsChevronRight />
    </article>
  );
};

export default Selector;
