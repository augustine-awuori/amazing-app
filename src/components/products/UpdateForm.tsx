import { useState } from "react";
import { toast } from "react-toastify";

import {
  ErrorMessage,
  Form,
  FormField,
  FormTextAreaField,
  SubmitButton,
} from "../form";
import { Product, ProductType } from "../../hooks/useProducts";
import { ProductInfo, productSchema } from "./Form";
import service from "../../services/products";
import ShopTypesSelector from "../shop/TypesSelector";

interface Props extends Product {
  onDone: () => void;
}

const UpdateForm = ({ _id, name, description, price, type, onDone }: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType>(type);

  const handleSubmit = async (info: ProductInfo) => {
    if (!Object.keys(selectedType).length)
      return setError("Select the product type");

    setLoading(true);
    toast.loading("Updating product details...Please wait");
    const res = await service.update({ ...info, type: selectedType._id }, _id);
    toast.dismiss();
    setLoading(false);

    if (!res.ok) return setError(res.problem || "Product update failed");
    onDone();
    toast.success("Product updated successfully");
    window.location.href = window.location.href;
  };

  return (
    <Form
      initialValues={{ name, description, price }}
      onSubmit={handleSubmit}
      validationSchema={productSchema}
    >
      <ErrorMessage error={error} visible />
      <ShopTypesSelector
        onTypeSelect={setSelectedType}
        selectedTypes={{ [selectedType._id]: selectedType }}
      />
      <FormField name="name" />
      <FormField name="price" type="number" />
      <FormTextAreaField name="description" />
      <SubmitButton title={loading ? "Updating" : "Update"} />
    </Form>
  );
};

export default UpdateForm;
