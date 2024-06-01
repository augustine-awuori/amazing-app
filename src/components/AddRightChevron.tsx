import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const AddRightChevron = ({ children, onClick }: Props) => (
  <section
    className="flex mt-2 cursor-pointer items-center w-full"
    onClick={onClick}
  >
    <article className="flex-grow">{children}</article>
    <FaChevronRight />
  </section>
);

export default AddRightChevron;
