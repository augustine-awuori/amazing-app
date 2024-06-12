import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GroupAvatar from "../GroupAvatar";
import useOrder, { Order } from "../../hooks/useOrder";
import useProducts, { Product } from "../../hooks/useProducts";

const OrderCard = (order: Order) => {
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);
  const { products: allProducts } = useProducts();
  const { setOrder } = useOrder();
  const navigate = useNavigate();

  const { _id, buyer, canceled, products, message, status, timestamp } = order;

  useEffect(() => {
    const realProducts: Product[] = [];

    allProducts.forEach((p) => {
      if (products[p._id]) realProducts.push(p);
    });

    setOrderProducts(realProducts);
  }, [allProducts, products]);

  const viewOrderDetails = () => {
    setOrder(order);
    navigate(_id);
  };

  return (
    <article
      className="card bg-base-100 shadow-md cursor-pointer my-4 flex flex-col sm:flex-row justify-between items-center max-w-screen-md mx-auto"
      onClick={viewOrderDetails}
    >
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <figure>
          <img
            src={buyer.avatar}
            alt={buyer.name}
            className="w-24 h-24 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{buyer.name}</h2>
          {message && <p className="text-sm">"{message}"</p>}
          <p>Status: {canceled ? "CANCELED" : status.label}</p>
          <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>
        </div>
      </div>
      <div className="md:pr-5 w-full sm:w-auto flex justify-center sm:justify-end mb-4 sm:mb-0">
        <GroupAvatar images={orderProducts.map((p) => p.images[0])} />
      </div>
    </article>
  );
};

export default OrderCard;
