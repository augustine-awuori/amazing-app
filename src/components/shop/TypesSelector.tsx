import { ProductType } from "../products/TypesList";
import Badge from "../products/TypeBadge";
import useProductTypes from "../../hooks/useProductTypes";

export type ShopTypes = {
  [typeId: string]: ProductType;
};

interface Props {
  onTypeSelect: (type: ProductType) => void;
  selectedTypes: ShopTypes;
}

const Container = ({ children }: React.PropsWithChildren<{}>) => (
  <article className="flex overflow-x-auto whitespace-nowrap">
    {children}
  </article>
);

const ShopTypesSelector = ({ onTypeSelect, selectedTypes }: Props) => {
  const { types, isLoading } = useProductTypes();

  if (isLoading)
    return <span className="loading loading-spinner text-warning" />;

  return (
    <>
      <p>Select Shop Types (Multiple)</p>
      <Container>
        {Object.values(selectedTypes)
          .filter((t) => t._id)
          .map(({ _id, label }) => (
            <p key={_id} className="mr-2 mb-1 text-primary font-bold">
              {label}
            </p>
          ))}
      </Container>
      <Container>
        {types
          .filter((t) => t._id)
          .map((type, index) => (
            <section key={index} className="mr-2">
              <Badge
                {...type}
                selectedType={selectedTypes[type._id]}
                onClick={() => onTypeSelect(type)}
              />
            </section>
          ))}
      </Container>
    </>
  );
};

export default ShopTypesSelector;
