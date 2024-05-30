import React from "react";

const Grid = ({ children }: { children: React.ReactNode }) => (
  <article className="flex justify-center">
    <article className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {children}
    </article>
  </article>
);

export default Grid;
