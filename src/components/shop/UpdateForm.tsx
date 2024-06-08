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
import { shopSchema } from "../../pages/ShopEditPage";
import { NewShopTypes, Shop, UpdatableShopInfo } from "../../hooks/useShop";
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
  const [selectedShopTypesId, setSelectedShopTypesId] = useState<NewShopTypes>(
    {}
  );

  useEffect(() => {
    prepareTypes();
  }, [allTypes]);

  const prepareTypes = () => {
    let output: ShopTypes = {};
    let outputIds: NewShopTypes = {};

    allTypes.forEach((type) => {
      if (types[type._id]) {
        output = { ...output, [type._id]: type };
        outputIds[type._id] = type._id;
      }
    });

    setSelectedShopTypesId(outputIds);
    setSelectedShopTypes(output);
  };

  const handleSubmit = async (info: UpdatableShopInfo) => {
    if (!Object.keys(selectedShopTypesId).length)
      return setError("Select at least one shop type");

    setLoading(true);
    toast.loading("Updating shop details...Please wait");
    const res = await service.update(
      { ...info, types: selectedShopTypesId },
      _id
    );
    toast.dismiss();
    setLoading(false);

    if (!res?.ok) return setError(res?.problem || "Shop Update failed");

    onDone();
    toast.success("Shop updated successfully");
    window.location.href = `/shops/${shopId}`;
  };

  const handleTypeSelect = (type: ProductType) => {
    if (!selectedShopTypes[type._id]) {
      setSelectedShopTypes({ ...selectedShopTypes, [type._id]: type });
      setSelectedShopTypesId({
        ...selectedShopTypesId,
        [type._id]: type._id,
      });
    } else {
      const newTypes = { ...selectedShopTypes };
      delete newTypes[type._id];
      const newTypesId = { ...selectedShopTypesId };
      delete newTypesId[type._id];
      setSelectedShopTypes(newTypes);
      setSelectedShopTypesId(newTypesId);
    }
  };

  return (
    <Form
      initialValues={{
        name,
        location,
        types: selectedShopTypesId,
      }}
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
