import { Product } from "../hooks/useProducts";
import { funcs } from "../utils";
import ShoppingCartIcon from "./ShoppingCartIcon";

const ProductCard = ({ name, description, price, images }: Product) => {
  return (
    <div className="w-full p-2 cursor-pointer">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={images[0]}
            alt={name}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p className="line-clamp-2">{description}</p>
          <button className="btn btn-primary btn-block mt-2">
            <ShoppingCartIcon />
            Ksh {funcs.addComma(price)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
