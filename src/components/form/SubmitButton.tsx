import React from "react";
import { useFormikContext } from "formik";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const SubmitButton = ({ title, ...otherProps }: Props) => {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      className="btn btn-primary w-full mb-2 "
      onClick={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      type="submit"
      {...otherProps}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
