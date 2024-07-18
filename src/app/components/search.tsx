import React, { useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <>
      <div className="relative flex items-center justify-center py-2 h-15">
        <div className="relative w-6/12">
          <FaMagnifyingGlass className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 px-4 py-2 h-15 rounded-lg border bg-primaryAccent focus:border-primaryBg focus:outline-none"
            type="search"
            placeholder="ຄົ້ນຫາຄຳ..."
          />
        </div>
      </div>
    </>
  );
};

export default Search;
