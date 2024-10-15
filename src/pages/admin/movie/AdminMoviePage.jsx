import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { fetchSortedMovies, getMovieList } from "../../../api/movieApi";
import { useNavigate } from "react-router-dom";

const AdminMovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("최신 순");
  const [searchCondition, setSearchCondition] = useState("");

  const pageSequence = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const startPage = Math.floor((page - 1) / 5) * 5 + 1;
      return startPage + index;
    },
  ).filter((p) => p <= totalPages);

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
      const searchData = await getMovieList(page, 10, searchCondition);
      setMovies(searchData.content);
    }
  };

  return (
    <>
      <div className="mb-4 ml-4 mt-8 text-2xl font-extrabold text-white">
        영화 목록
      </div>
      <div className="flex max-w-full flex-col p-4 text-sm">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            className="flex h-10 items-center justify-center rounded-lg bg-white px-4 text-gray-700 hover:bg-gray-200"
            onClick={() => navigate(`/admin/movie`)}
          >
            영화 등록
          </button>
          <div className="flex items-center">
            <select
              className="mr-4 h-10 rounded-lg border px-2 text-gray-700 hover:bg-gray-200"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value={"최신 순"}>최신 순</option>
              <option value={"오래된 순"}>오래된 순</option>
            </select>
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="text"
                className="h-10 w-48 rounded-full border px-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="검색어를 입력하세요."
                value={searchCondition}
                onChange={(e) => setSearchCondition(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1">
                <IoMdSearch className="h-6 w-6 text-gray-600" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 h-full overflow-auto rounded-lg border border-gray-500 bg-gray-800">
          <table className="w-full border-collapse text-center">
            <thead className="bg-gray-700 text-white">
              <tr>
                {[
                  "번호",
                  "제목",
                  "장르",
                  "상영시간",
                  "개봉일",
                  "관람등급",
                  "상영관",
                  "상영종료일",
                  "상영회차",
                ].map((header) => (
                  <th key={header} className="border-gray-500 px-4 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white">
              {movies.map((movie, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-700"
                  onClick={() => navigate(`/admin/movie/${movie.movieNum}`)}
                >
                  <td className="border-gray-500 px-4 py-3">
                    {(page - 1) * 10 + index + 1}
                  </td>
                  <td className="border-gray-500 px-4 py-3">
                    {movie.korTitle}
                  </td>
                  <td className="border-gray-500 px-4 py-3">{movie.genre}</td>
                  <td className="border-gray-500 px-4 py-3">
                    {movie.runTime}분
                  </td>
                  <td className="border-gray-500 px-4 py-3">
                    {movie.movieStartDate}
                  </td>
                  <td className="border-gray-500 px-4 py-3">{movie.rating}</td>
                  <td className="border-gray-500 px-4 py-3">
                    {movie.theaterNum === 0 ? "일반관" : "커플관"}
                  </td>
                  <td className="border-gray-500 px-4 py-3">
                    {movie.movieEndDate}
                  </td>
                  <td className="border-gray-500 px-4 py-3">
                    {" "}
                    {[
                      movie.round1 === 1 ? "1" : null,
                      movie.round2 === 1 ? "2" : null,
                      movie.round3 === 1 ? "3" : null,
                      movie.round4 === 1 ? "4" : null,
                      movie.round5 === 1 ? "5" : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="mx-1 h-10 rounded bg-gray-700 px-4 text-white hover:bg-gray-600"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            &lt;&lt;
          </button>
          <button
            className="mx-1 h-10 rounded bg-gray-700 px-4 text-white hover:bg-gray-600"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            이전
          </button>
          {pageSequence.map((p) => (
            <button
              key={p}
              className={`mx-1 h-10 rounded px-4 text-white ${p === page ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="mx-1 h-10 rounded bg-gray-700 px-4 text-white hover:bg-gray-600"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            다음
          </button>
          <button
            className="mx-1 h-10 rounded bg-gray-700 px-4 text-white hover:bg-gray-600"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminMovieListPage;
