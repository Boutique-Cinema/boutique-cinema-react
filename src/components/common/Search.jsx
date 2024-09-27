import React from "react";
import { IoMdSearch } from "react-icons/io";

export default function Search() {
  return (
    <div className="relative">
      <h2 className="sr-only">영화검색</h2>
      <input
        type="text"
        className="h-9 w-[250px] rounded-full border pl-3 text-black"
        placeholder="영화 검색"
      />
      <button className="absolute bottom-1.5 right-3" type="submit">
        <IoMdSearch className="h-6 w-6 text-[#393e46]" />
      </button>
    </div>
  );
}
