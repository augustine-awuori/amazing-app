interface Props {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

const Input = ({ onChange, ...otherProps }: Props) => (
  <input
    {...otherProps}
    type="text"
    onChange={(e) => onChange(e.target.value)}
    className="m-0 w-full px-4 py-3 pr-10 border border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
  />
);

export default Input;
