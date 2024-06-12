import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";

import { Product } from "../../hooks/useProducts";
import { funcs } from "../../utils";
import { useCart } from "../../hooks";
import ShoppingCartIcon from "../ShoppingCartIcon";

const ProductCard = ({ _id, name, description, price, images }: Product) => {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const cart = useCart();

  const productInCart = cart.hasProduct(_id);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const navigateToDetails = () => navigate(`/mart/products/${_id}`);

  const updateCart = () => (productInCart ? cart.remove(_id) : cart.add(_id));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <article
      className="w-full p-1 cursor-pointer relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="card bg-base-100 shadow-xl relative">
        <div className="image-container">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={name}
              onClick={navigateToDetails}
              className={`w-full h-96 object-cover rounded-lg image ${
                currentImageIndex === index ? "active" : ""
              }`}
              style={{
                transform: `translateX(${
                  currentImageIndex === index ? 0 : "100%"
                })`,
                transition: "transform 0.5s ease-in-out",
              }}
            />
          ))}
        </div>
        <article className="rounded-b-md absolute bottom-0 left-0 right-0 py-2 px-3 bg-black bg-opacity-50 text-white">
          {hovered && (
            <article
              onClick={navigateToDetails}
              style={{ transition: "opacity 0.3s ease-in-out" }}
            >
              <h2 className="card-title text-lg">{name}</h2>
              <p className="line-clamp-2">{description}</p>
            </article>
          )}
          <button className="btn btn-primary btn-block" onClick={updateCart}>
            {!productInCart && <ShoppingCartIcon />}
            {productInCart ? (
              <BsCartCheckFill size={20} />
            ) : (
              `Ksh ${funcs.addComma(price)}`
            )}
          </button>
        </article>
      </article>

      <style>
        {`
          .image-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 75%; /* Adjust the padding-top value to change the height */
            overflow: hidden; /* Hide overflow to prevent visible scrolling */
          }

          .image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }

          .image.active {
            opacity: 1;
          }
        `}
      </style>
    </article>
  );
};

export default ProductCard;
