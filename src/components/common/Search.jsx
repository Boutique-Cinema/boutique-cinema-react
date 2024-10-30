import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { fetchSortedMovies } from "../../api/movieApi";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [movies, setMovies] = useState([]); // 영화 목록 상태 관리
  const [page] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [sortOrder] = useState("최신 순");
  const [searchCondition, setSearchCondition] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchSortedMovies(page, 10, sortOrder);
      setMovies(data.content);
      setTotalPages(data.totalPages);
    };

    fetchMovies();
  }, [page, sortOrder]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchCondition) {
      // 검색어가 있으면 movie 페이지로 이동
      navigate(`/movie/list?search=${searchCondition}`);
    }
  };

  return (
    <div className="relative">
      <form className="relative" onSubmit={handleSearch}>
        <input
          type="text"
          className="h-10 w-56 rounded-full border px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="영화제목 검색"
          value={searchCondition}
          onChange={(e) => setSearchCondition(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-2">
          <IoMdSearch className="h-6 w-6 text-gray-600" />
        </button>
      </form>
    </div>
  );
}
