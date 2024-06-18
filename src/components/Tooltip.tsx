import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  message: string;
}

const Tooltip = ({ children, message }: Props) => {
  return (
    <article className="tooltip tooltip-open tooltip-left" data-tip={message}>
      {children}
    </article>
  );
};

export default Tooltip;
