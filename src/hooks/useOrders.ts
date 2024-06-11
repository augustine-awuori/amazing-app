import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { NewOrder, Order, OrderProducts } from "./useOrder";
import { OrderShopProducts } from "./useShop";
import { DataError, processResponse, Response } from "../services/client";
import { Product } from "./useProducts";
import { useCart, useStatus, useUser } from ".";
import notificationsService from "../services/notifications";
import service from "../services/orders";

const PENDING_ORDER_STATUS_ID = "65f7f5babfb2e60edd3733a1";

const useOrders = () => {
  const [success, setSuccess] = useState(true);
  const cart = useCart();
  const navigate = useNavigate();
  const { status } = useStatus();
  const { user: currentUser } = useUser();

  const getShopsProducts = (): OrderShopProducts => {
    const shopsProducts: OrderShopProducts = {};

    cart.getProducts().forEach((p) => {
      const shopId = p.shop._id;

      if (shopsProducts[shopId])
        shopsProducts[shopId] = [...shopsProducts[shopId], p];
      else shopsProducts[shopId] = [p];
    });

    return shopsProducts;
  };

  const getPendingOrderStatusId = () =>
    status.find((s) => s.label.toLowerCase().includes("pending"))?._id ||
    PENDING_ORDER_STATUS_ID;

  const prepOrderProducts = (products: Product[]): OrderProducts => {
    const result: OrderProducts = {};

    products.forEach(({ _id }) => {
      result[_id] = cart.getProductQuantity(_id);
    });

    return result;
  };

  const prepOrder = (products: Product[], message: string): NewOrder => ({
    message,
    products: prepOrderProducts(products),
    shop: products[0].shop._id,
    status: getPendingOrderStatusId(),
  });

  const isOrderStateValid = (products: Product[]): boolean => {
    if (products.length) return true;

    const message = !products.length
      ? "Error! Your products are not reflected in your shopping bag"
      : "App error!";
    toast.error(message);

    navigate(-1);
    return false;
  };

  const process = (res: AxiosResponse<unknown, unknown>): Response => {
    const { data, ok, problem } = processResponse(res);

    if (ok) {
      toast.success("Order placed successfully!");
      notificationsService.create({
        title: "Amazing Mart",
        description: `${currentUser?.name} has placed an order`,
        to: (data as Order).shop.author._id,
      });
    } else {
      toast.error(problem);
    }

    return { data, ok, problem };
  };

  const makeOrder = async (products: Product[], message = "") => {
    if (!isOrderStateValid(products))
      return { data: null, ok: false, problem: "CLIENT_ERROR" };

    return process(await service.makeOrder(prepOrder(products, message)));
  };

  const makeShopOrder = async (prods: Product[], message: string) => {
    const { ok } = await makeOrder(prods, message);

    if (ok) prods.forEach((p) => cart.remove(p._id));
    else setSuccess(ok);
  };

  const makeShopsOrders = async (message: string) => {
    toast.loading("Placing orders to every shop...");
    for (const [, products] of Object.entries(getShopsProducts()))
      await makeShopOrder(products, message);
    toast.dismiss();

    if (success) {
      cart.clear();
      navigate("/");
    } else toast.error("Something went wrong! Some orders aren't placed");

    return success;
  };

  const updateOrder = async (orderId: string, update: object) => {
    toast.loading("Updating order status...");
    const res = await service.updateOrder(orderId, update);
    toast.dismiss();

    processResponse(res).ok
      ? toast.success("Order status updated successfully!")
      : toast.error(
          (res.data as DataError).error || "Order status update failed"
        );

    return res;
  };

  return { makeShopsOrders, updateOrder };
};

export default useOrders;
