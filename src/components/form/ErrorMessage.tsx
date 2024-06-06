interface Props {
  error?: string | null;
  visible?: boolean;
}

const ErrorMessage = ({ error, visible }: Props) => {
  if (visible && error) {
    return <p className="text-red-600 text-sm mt-1">{error}</p>;
  }

  return null;
};

export default ErrorMessage;
