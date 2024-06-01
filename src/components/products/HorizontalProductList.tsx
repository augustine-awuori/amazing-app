import { Product } from "../../hooks/useProducts";
import ProductCard from "./Card";

interface Props {
  products: Product[];
}

const HorizontalProductList = ({ products }: Props) => (
  <section className="flex overflow-x-auto space-x-4 pr-4">
    <article className="flex-shrink-0 flex">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </article>
    <style>{`
      section::-webkit-scrollbar {
        width: 10px;
      }

      section::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 5px;
      }

      section::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 5px;
      }

      section::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `}</style>
  </section>
);

export default HorizontalProductList;
