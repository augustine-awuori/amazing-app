import { Product } from "../../hooks/useProducts";
import Grid from "../Grid";
import ProductCard from "./Card";

interface Props {
  products: Product[];
}

const ProductsGrid = ({ products }: Props) => {
  return (
    <section className="p-4 pt-0">
      <Grid>
        {products.map((p) => (
          <ProductCard key={p._id} {...p} />
        ))}
      </Grid>
    </section>
  );
};

export default ProductsGrid;
