import { useNavigate } from "react-router-dom";

interface Props {
  children: string;
  route: string;
}

const Link = ({ children, route }: Props) => {
  const navigate = useNavigate();

  return (
    <p
      className="inline text-blue-600 cursor-pointer"
      onClick={() => navigate(route)}
    >
      {children}
    </p>
  );
};

export default Link;
