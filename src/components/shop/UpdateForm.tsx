import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ErrorMessage,
  Form,
  FormField,
  FormTextAreaField,
  SubmitButton,
} from "../form";
import { NewShopInfo, shopSchema } from "../../pages/ShopEditPage";
import { Shop } from "../../hooks/useShop";
import { ProductType } from "../products/TypesList";
import { useProductTypes } from "../../hooks";
import service from "../../services/shops";
import ShopTypesSelector, { ShopTypes } from "./TypesSelector";

interface Props extends Shop {
  onDone: () => void;
}

const UpdateForm = ({ onDone, location, name, types, _id }: Props) => {
  const [error, setError] = useState("");
  const [selectedShopTypes, setSelectedShopTypes] = useState<ShopTypes>({});
  const { types: allTypes } = useProductTypes();
  const { shopId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prepareTypes();
  }, []);

  const prepareTypes = () => {
    let output: ShopTypes = {};

    allTypes.forEach((type) => {
      if (types[type._id]) output = { ...output, [type._id]: type };
    });

    setSelectedShopTypes(output);
  };

  const handleSubmit = async (info: NewShopInfo) => {
    setLoading(true);
    toast.loading("Updating shop details...Please wait");
    const res = await service.update(info, _id);
    toast.dismiss();
    setLoading(false);
    if (!res?.ok) return setError(res?.problem || "Shop Update failed");

    onDone();
    toast.success("Shop updated successfully");
    window.location.href = `/shops/${shopId}`;
  };

  const handleTypeSelect = (type: ProductType) => {
    if (!selectedShopTypes[type._id])
      setSelectedShopTypes({ ...selectedShopTypes, [type._id]: type });
    else {
      const newTypes = { ...selectedShopTypes };
      delete newTypes[type._id];
      setSelectedShopTypes(newTypes);
    }
  };

  return (
    <Form
      initialValues={{ name, location }}
      onSubmit={handleSubmit}
      validationSchema={shopSchema}
    >
      <ErrorMessage error={error} visible />
      <ShopTypesSelector
        onTypeSelect={handleTypeSelect}
        selectedTypes={selectedShopTypes}
      />
      <FormField name="name" />
      <FormTextAreaField name="location" />
      <SubmitButton title={loading ? "Updating" : "Update"} />
    </Form>
  );
};

export default UpdateForm;
