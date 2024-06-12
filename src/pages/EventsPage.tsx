import { useState } from "react";

import { Pagination } from "../components";
import { paginate } from "../utils";
import usePosters, { Poster } from "../hooks/usePosters";

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const { posters } = usePosters();

  const paginated = paginate<Poster>(posters, currentPage, pageSize);

  return (
    <section>
      <div className="min-h-screen py-10 px-4 pt-0">
        <h1 className="text-4xl font-bold text-center mb-8">Posters</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map((poster, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 shadow-xl overflow-hidden"
            >
              <figure>
                <img
                  src={poster.image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsCount={paginated.length}
        pageSize={pageSize}
      />
    </section>
  );
};

export default EventsPage;
