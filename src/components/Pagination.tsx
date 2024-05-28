import _ from "lodash";

interface Props {
  currentPage: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  itemsCount,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="flex justify-center mb-3">
      <div className="join">
        {pages.map((page) => (
          <input
            aria-label={`${page}`}
            checked={page === currentPage}
            className="join-item btn btn-square"
            name="options"
            onClick={() => onPageChange(page)}
            type="radio"
          />
        ))}
      </div>
    </div>
  );
};

export default Pagination;
