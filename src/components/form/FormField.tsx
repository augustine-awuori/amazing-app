import { useFormikContext } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // You need to install react-icons if not already installed

import { capitalizeFirstLetter, getBoolean } from "../../utils/funcs";
import { ErrorMessage, FormInput } from ".";

interface FieldValue {
  [key: string]: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  width?: string;
  placeholder?: string;
}

const FormField = ({
  name,
  width = "100%",
  placeholder,
  type = "text",
  ...inputProps
}: Props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<FieldValue>();
  const [showPassword, setShowPassword] = useState(false);

  const capitalizedName = capitalizeFirstLetter(name);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700">
        {capitalizedName}
      </label>
      <div className="relative">
        <FormInput
          onBlur={() => setFieldTouched(name)}
          value={values[name]}
          onChangeText={(text) => setFieldValue(name, text)}
          placeholder={placeholder || capitalizedName}
          type={type === "password" && showPassword ? "text" : type}
          className="input input-bordered w-full"
          style={{ width }}
          {...inputProps}
        />
        {type === "password" && (
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      <ErrorMessage error={errors[name]} visible={getBoolean(touched[name])} />
    </section>
  );
};

export default FormField;
