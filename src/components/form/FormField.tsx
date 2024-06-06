import { useFormikContext } from "formik";

import { ErrorMessage, FormInput } from ".";
import { capitalizeFirstLetter, getBoolean } from "../../utils/funcs";

interface FieldValue {
  [key: string]: string;
}

interface Props {
  name: string;
  width?: string;
  placeholder?: string;
}

const FormField = ({
  name,
  width = "100%",
  placeholder,
  ...inputProps
}: Props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<FieldValue>();

  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <section className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {capitalizedName}
      </label>
      <FormInput
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        onChangeText={(text) => setFieldValue(name, text)}
        placeholder={placeholder || capitalizedName}
        className="input input-bordered w-full"
        style={{ width }}
        {...inputProps}
      />
      <ErrorMessage error={errors[name]} visible={getBoolean(touched[name])} />
    </section>
  );
};

export default FormField;
