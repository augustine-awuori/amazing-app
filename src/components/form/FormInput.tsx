import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeText: (text: string) => void;
}

const FormInput = ({ onChangeText, ...inputProps }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChangeText(e.target.value);
  };

  return (
    <input
      type="text"
      className="input input-bordered w-full text-lg"
      onChange={handleChange}
      {...inputProps}
    />
  );
};

export default FormInput;
