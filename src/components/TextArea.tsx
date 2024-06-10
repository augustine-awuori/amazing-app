import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea = ({ ...otherProps }: Props) => {
  return (
    <textarea
      {...otherProps}
      className="textarea textarea-accent block w-full p-2 border rounded-md"
    />
  );
};

export default TextArea;
