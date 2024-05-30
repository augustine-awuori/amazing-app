interface Props {
  query: string;
  onQuery: (query: string) => void;
  onProductCreation: () => void;
}

const Header = ({ onQuery, query }: Props) => {
  return (
    <section className="max-w-100 mx-auto flex items-center space-x-4 px-5">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="m-0 w-full px-4 py-3 pr-10 border border-blue-500 rounded-md focus:outline-none focus:border-blue-500"
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
      <button className="btn btn-primary hidden md:inline">New Product</button>
      <button className="btn btn-primary md:hidden">&#43;</button>
    </section>
  );
};

export default Header;
