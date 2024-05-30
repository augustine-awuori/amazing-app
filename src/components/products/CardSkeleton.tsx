const CardSkeleton = () => (
  <div className="w-full p-2 cursor-pointer  mb-8 md:mb-0">
    <div className="card bg-base-100 shadow-xl">
      <div className="flex flex-col gap-4 w-full">
        <div className="skeleton h-48 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  </div>
);

export default CardSkeleton;
