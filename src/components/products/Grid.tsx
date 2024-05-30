import { Product } from "../../hooks/useProducts";
import ProductCard from "./Card";

interface Props {
  products: Product[];
}

const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
