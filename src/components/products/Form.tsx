import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  ErrorMessage,
  Form,
  FormField,
  FormTextAreaField,
  SubmitButton,
} from "../form";
import { NewProduct } from "../../services/products";
import { ProductType } from "./TypesList";
import { useImages, useUser } from "../../hooks";
import ImageInputList from "../common/ImageInputList";
import service from "../../services/products";
import ShopTypesSelector from "../shop/TypesSelector";
import storage from "../../db/image";
import { emptyType } from "../../utils/empty";

const schema = Yup.object().shape({
  name: Yup.string().min(1).max(50).required(),
  price: Yup.string().min(1).max(1000000).required(),
  description: Yup.string(),
});

type Info = Yup.InferType<typeof schema>;

const MAX_IMAGE_INPUT = 3;

interface Props {
  onDone: () => void;
}

const ProductForm = ({ onDone }: Props) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { images, imagesCount, removeAllImages } = useImages(MAX_IMAGE_INPUT);
  const [selectedType, setSelectedType] = useState<ProductType>(emptyType);
  const { user } = useUser();
  const { shopId } = useParams();

  const makeProductFrom = async (
    info: Info
  ): Promise<NewProduct | undefined> => {
    toast.loading("Saving product images");
    const imagesUrl = await storage.saveImages(images);
    toast.dismiss();
    if (!imagesUrl.length) {
      setError("Error saving images");
      return;
    }

    if (user && shopId)
      return {
        ...info,
        author: user._id,
        images: imagesUrl,
        shop: shopId,
        type: selectedType._id,
      };
  };

  const handleSubmit = async (info: Info) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select at least an image");
    if (!selectedType._id) return setError("Please select the product type");

    setLoading(true);
    const newProduct = await makeProductFrom(info);
    if (!newProduct) return setLoading(false);

    const res = await service.create(newProduct);
    setLoading(false);

    if (!res?.ok) {
      await storage.deleteImages(newProduct.images);
      return setError(res?.problem || "Product couldn't be saved");
    }

    toast.info("Product created successfully");
    removeAllImages();
    window.location.href = `/shops/${shopId}`;
    onDone();
  };

  return (
    <Form
      initialValues={{ name: "", price: "", description: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <ImageInputList imagesLimit={MAX_IMAGE_INPUT} />
      <ErrorMessage error={error} visible />
      <ShopTypesSelector
        onTypeSelect={setSelectedType}
        selectedTypes={{ [selectedType._id]: selectedType }}
      />
      <FormField name="name" />
      <FormField name="price" type="number" />
      <FormTextAreaField name="description" />
      <SubmitButton
        title={isLoading ? "Creating Product..." : "Create Product"}
      />
    </Form>
  );
};

export default ProductForm;
