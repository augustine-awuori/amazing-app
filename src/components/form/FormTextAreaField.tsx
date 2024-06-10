import { useFormikContext } from "formik";

import { capitalizeFirstLetter } from "../../utils/funcs";
import ErrorMessage from "./ErrorMessage";
import TextArea from "../TextArea";

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
      <TextArea
        id={name}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        placeholder={placeholder || capitalizedName}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={!!touched[name]} />
    </article>
  );
};

export default TextAreaField;
