import { Product } from "../../hooks/useProducts";
import ProductCard from "./Card";

interface Props {
  products: Product[];
}

const ProductsGrid = ({ products }: Props) => {
  return (
    <section className="p-4">
      <article className="flex justify-center">
        <article className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </article>
      </article>
    </section>
  );
};

export default ProductsGrid;
