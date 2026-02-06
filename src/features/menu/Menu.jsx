import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import SearchItem from "./SearchItem";
import { useState } from "react";

function Menu() {
  const menu = useLoaderData();
  const [filteredMenu, setFilteredMenu] = useState(menu);

  return (
    <>
      <div className="sticky top-0 z-10 mx-auto max-w-4xl px-4 py-4 backdrop-blur-sm">
        <SearchItem menu={menu} onSearch={setFilteredMenu} />
      </div>

      <ul className="mb-8 divide-y divide-stone-400 pb-5">
        {filteredMenu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
