import { toast } from "react-toastify";

import { useUser } from "../../hooks";
import Input from "../Input";

interface Props {
  onButtonClick: () => void;
  onQuery: (query: string) => void;
  placeholder: string;
  query: string;
}

const Header = ({ onQuery, query, placeholder, onButtonClick }: Props) => {
  const { user } = useUser();

  const handleButtonClick = () =>
    user ? onButtonClick() : toast.info("You're not logged in");

  return (
    <header className="max-w-100 mx-auto flex items-center space-x-4 pl-1 pr-3">
      <div className="relative flex-grow">
        <Input
          placeholder={`Search ${placeholder}...`}
          value={query}
          onChange={onQuery}
        />
        {query && (
          <button
            className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent text-gray-500"
            onClick={() => onQuery("")}
          >
            X
          </button>
        )}
      </div>
      <button
        onClick={handleButtonClick}
        className="btn btn-primary hidden md:inline"
      >
        &#43; Add {placeholder}
      </button>
      <button onClick={handleButtonClick} className="btn btn-primary md:hidden">
        &#43;
      </button>
    </header>
  );
};

export default Header;
