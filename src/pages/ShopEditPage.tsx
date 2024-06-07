import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  FormTextAreaField,
} from "../components/form";
import { prepShopTypes } from "../hooks/useShops";
import { ProductType } from "../components/products/TypesList";
import { Shop } from "../hooks/useShop";
import { ShopTypes } from "../components/shop/TypesSelector";
import { ShopTypesSelector } from "../components";
import { useImages, useShops } from "../hooks";
import ImageInputList from "../components/common/ImageInputList";
import storage from "../db/image";

export const shopSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required(),
  location: Yup.string().min(3).max(255).required(),
});

export type NewShopInfo = Yup.InferType<typeof shopSchema>;

const MAX_IMAGE_INPUT = 1;

const ShopEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { images, imagesCount, removeAllImages } = useImages(MAX_IMAGE_INPUT);
  const [selectedShopTypes, setSelectedShopTypes] = useState<ShopTypes>({});
  const shops = useShops();
  const navigate = useNavigate();

  const handleTypeSelect = (type: ProductType) => {
    if (!selectedShopTypes[type._id])
      setSelectedShopTypes({ ...selectedShopTypes, [type._id]: type });
    else {
      const newTypes = { ...selectedShopTypes };
      delete newTypes[type._id];
      setSelectedShopTypes(newTypes);
    }
  };

  const createShop = async (info: NewShopInfo) => {
    setLoading(true);
    toast.loading("Saving shop image...");
    const image = await storage.saveImage(images[0]);
    toast.loading("Saving shop...");
    const res = await shops.create({
      ...info,
      image,
      types: prepShopTypes(selectedShopTypes),
    });
    toast.dismiss();
    setLoading(false);

    if (!res.ok) await storage.deleteImage(image);

    return res;
  };

  const handleSubmit = async (info: NewShopInfo) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select an image");
    if (!Object.keys(selectedShopTypes).length)
      return setError("Please select at least one shop type");

    const { data, error: resError, ok } = await createShop(info);
    if (!ok) return setError(resError);

    toast.success("Shop created successfully");
    removeAllImages();
    navigate(`/shops/${(data as Shop)._id}`);
  };

  return (
    <Form
      initialValues={{ name: "", location: "" }}
      onSubmit={handleSubmit}
      title="New Shop"
      validationSchema={shopSchema}
    >
      <section className="m-y-auto py-5 px-3 rounded-lg shadow-lg">
        <ImageInputList imagesLimit={MAX_IMAGE_INPUT} />
        <ErrorMessage error={error} visible />
        <ShopTypesSelector
          onTypeSelect={handleTypeSelect}
          selectedTypes={selectedShopTypes}
        />
        <FormField name="name" />
        <FormTextAreaField name="location" />
        <SubmitButton title={isLoading ? "Creating Shop..." : "Create Shop"} />
      </section>
    </Form>
  );
};

export default ShopEditPage;
