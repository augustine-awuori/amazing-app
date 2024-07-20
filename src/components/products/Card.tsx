import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";

import { funcs } from "../../utils";
import { useCart, useUser } from "../../hooks";
import service from "../../services/products";
import ShoppingCartIcon from "../ShoppingCartIcon";
import useProducts, { Product } from "../../hooks/useProducts";

const ProductCard = ({ _id, name, description, price, images }: Product) => {
  const [hovered, setHovered] = useState(false);
  const [updatingViews, setUpdatingViews] = useState(false);
  const [viewsUpdated, setViewsUpdated] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const helper = useProducts();
  const { user } = useUser();
  const navigate = useNavigate();
  const cart = useCart();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const productInCart = cart.hasProduct(_id);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const navigateToDetails = () => navigate(`/mart/products/${_id}`);

  const handleClick = () => {
    navigateToDetails();
    updateViews();
  };

  const updateCart = () => (productInCart ? cart.remove(_id) : cart.add(_id));

  async function updateViews() {
    if (updatingViews || viewsUpdated || !user) return;

    const product = helper.findById(_id);
    const viewed = product?.views?.some((v) => v.viewer === user?._id);
    if (viewed) return;

    setUpdatingViews(true);
    const res = await service.addView(product?._id || "");
    setUpdatingViews(false);
    setViewsUpdated(true);

    if (res.ok) {
      const update = res.data as Product;
      helper.findByIdAndUpdate(update._id, update);
    }
  }

  return (
    <article
      className="w-full p-1 cursor-pointer relative overflow-hidden max-w-md" // Add max-w-md for max width
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
              onClick={handleClick}
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
            padding-top: 75%;  
            overflow: hidden; 
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
