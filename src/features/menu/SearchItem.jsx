import { useState } from "react";

function SearchItem({ menu, onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    const result =
      value.length > 0
        ? menu.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()),
          )
        : menu;

    onSearch(result);
  }

  return (
    <input
      placeholder="Search for your pizza 🍕"
      value={query}
      onChange={handleChange}
      className="w-full rounded-2xl bg-yellow-50 px-12 py-3 text-sm text-stone-700 shadow-md shadow-stone-200 outline-none transition-all duration-300 placeholder:text-stone-400 focus:bg-white focus:shadow-lg focus:shadow-yellow-300/50 focus:ring-2 focus:ring-yellow-400"
    />
  );
}

export default SearchItem;
