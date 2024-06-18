import { useNavigate } from "react-router-dom";

import { funcs } from "../../utils";
import { Shop } from "../../hooks/useShop";
import { useProducts } from "../../hooks";
import GroupAvatar from "../GroupAvatar";

const Profile = ({ _id, image, name, location }: Shop) => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const shopProducts = products.filter((p) => p.shop._id === _id);

  const navigateToShop = () =>
    navigate(`/mart/shops/${funcs.convertNameToUrl(name)}`);

  return (
    <article
      className="card w-full glass cursor-pointer"
      onClick={navigateToShop}
    >
      <figure className="relative h-48 w-full">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </figure>
      <section className="card-body">
        <h2 className="card-title line-clamp-2">{name}</h2>
        <p className="line-clamp-1 text-sm">- {location}</p>
        <GroupAvatar images={shopProducts.map((p) => p.images[0])} />
      </section>
    </article>
  );
};

export default Profile;
