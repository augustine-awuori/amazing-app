import { useState } from "react";

import { Input, ShopSelector } from "..";
import { Shop } from "../../hooks/useShop";
import { useShops, useUser } from "../../hooks";

interface Props {
  onDoneShopSelect: () => void;
  onShopSelect: (shopId: string) => void;
  selectedShop: string;
}

const ShopSelectors = ({
  onDoneShopSelect,
  onShopSelect,
  selectedShop,
}: Props) => {
  const { shops: allShops, isLoading } = useShops();
  const { user } = useUser();
  const [query, setQuery] = useState("");

  const shops: Shop[] = user?.isAdmin
    ? allShops
    : allShops.filter((s) => s.author._id === user?._id);

  const filtered: Shop[] = query
    ? shops.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : shops;

  if (isLoading)
    return (
      <section className="flex items-center justify-center">
        <span className="loading loading-dots loading-md" />
        <p className="ml-3 text-center text-white">Fetching shops...</p>
      </section>
    );

  return (
    <section>
      <Input onChange={setQuery} placeholder="Search Your Shop" value={query} />
      {filtered.length ? (
        filtered.map((shop, index) => (
          <ShopSelector
            key={index}
            onClick={() => onShopSelect(shop._id)}
            selected={selectedShop === shop._id}
            onDoubleClick={onDoneShopSelect}
            shop={shop}
          />
        ))
      ) : (
        <section className="flex-1 mt-3">
          <p className="text-white text-center">None found!</p>
        </section>
      )}
    </section>
  );
};

export default ShopSelectors;
