import { ShopProfile } from "..";
import { Shop } from "../../hooks/useShop";
import Grid from "../Grid";

interface Props {
  shops: Shop[];
}

const ShopsGrid = ({ shops }: Props) => {
  return (
    <section className="p-4 pt-0">
      <Grid>
        {shops.map((shop) => (
          <ShopProfile key={shop._id} {...shop} />
        ))}
      </Grid>
    </section>
  );
};

export default ShopsGrid;
