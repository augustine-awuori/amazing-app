import { useEffect, useState } from "react";

import { funcs } from "../../utils";
import { OrderProducts } from "../../hooks/useOrder";
import useProducts, { Product } from "../../hooks/useProducts";

interface Props {
  orderProducts: OrderProducts;
}

const titleHeads = ["", "Name", "Quantity", "Sum", ""];

const Table = ({ orderProducts }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { products: allProducts } = useProducts();

  useEffect(() => {
    const found: Product[] = [];

    allProducts.forEach((p) => {
      if (orderProducts[p._id]) found.push(p);
    });

    setProducts(found);
  }, [orderProducts]);

  const grandTotal = products.reduce(
    (total, { price, _id }) => total + price * orderProducts[_id],
    0
  );

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {titleHeads.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(({ _id, images, name, price }) => {
            const quantity = orderProducts[_id];

            return (
              <tr key={_id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={images[0]} alt={name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-clamp-1">{name}</div>
                      <div className="text-sm opacity-50">
                        Ksh {funcs.addComma(price)}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{quantity}</td>
                <td>Ksh {funcs.addComma(quantity * price)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button className="btn btn-ghost btn-xs">
          Grand Total {funcs.addComma(grandTotal)}
        </button>
      </div>
    </div>
  );
};

export default Table;
