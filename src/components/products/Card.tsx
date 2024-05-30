import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Product } from "../../hooks/useProducts";
import { funcs } from "../../utils";
import ShoppingCartIcon from "../ShoppingCartIcon";

const ProductCard = ({ _id, name, description, price, images }: Product) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <article
      className="w-full p-1 cursor-pointer relative overflow-hidden"
      onClick={() => navigate(`/products/${_id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="card bg-base-100 shadow-xl relative">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <article className="rounded-b-md absolute bottom-0 left-0 right-0 py-2 px-3 bg-black bg-opacity-50 text-white">
          {hovered && (
            <article style={{ transition: "opacity 0.3s ease-in-out" }}>
              <h2 className="card-title text-lg">{name}</h2>
              <p className="line-clamp-2">{description}</p>
            </article>
          )}
          <button className="btn btn-primary btn-block">
            <ShoppingCartIcon />
            Ksh {funcs.addComma(price)}
          </button>
        </article>
      </article>
    </article>
  );
};

export default ProductCard;
