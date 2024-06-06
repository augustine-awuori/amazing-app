import { useFormikContext } from "formik";

import { capitalizeFirstLetter } from "../../utils/funcs";
import ErrorMessage from "./ErrorMessage";

interface FieldValue {
  [key: string]: string;
}

interface Props {
  placeholder?: string;
  name: string;
}

const TextAreaField = ({ name, placeholder }: Props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<FieldValue>();

  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <article className="my-4">
      <label className="block font-semibold mb-1" htmlFor={name}>
        {capitalizedName}
      </label>
      <textarea
        id={name}
        onBlur={() => setFieldTouched(name)}
        className="textarea textarea-accent block w-full p-2 border rounded-md"
        placeholder={placeholder || capitalizedName}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={!!touched[name]} />
    </article>
  );
};

export default TextAreaField;
