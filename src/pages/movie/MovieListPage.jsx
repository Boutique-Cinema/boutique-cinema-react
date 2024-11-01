import React, { useState, useEffect } from "react";
import { getMovieList } from "../../api/movieApi";
import { useLocation, useNavigate } from "react-router-dom";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchCondition = queryParams.get("search");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await getMovieList(
        currentPage,
        itemsPerPage,
        searchCondition,
      );

      // 중복된 제목 제거
      const uniqueMovies = Array.from(
        new Map(
          result.content.map((movie) => [movie.korTitle, movie]),
        ).values(),
      );

      // 최신순으로 정렬
      const sortedMovies = uniqueMovies.sort(
        (a, b) => new Date(b.movieStartDate) - new Date(a.movieStartDate),
      );

      setTotalPages(result.totalPages);
      setMovies(sortedMovies); // 최신순으로 정렬된 영화 목록 설정
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchCondition]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4">
      {movies.length === 0 ? (
        <div className="text-center text-gray-400">영화가 없습니다.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie.movieNum}
                className="relative cursor-pointer rounded-lg border border-gray-300 bg-gray-800 p-4 shadow-lg hover:bg-gray-700"
                onClick={() => navigate(`/movie/${movie.movieNum}`)}
              >
                <img
                  src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                  alt={movie.korTitle}
                  className="mb-4 w-full rounded-lg"
                />
                <div className="mb-3 flex">
                  <div className="flex gap-3">
                    {movie.rating === "전체" ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-green-600 font-medium">
                        All
                      </div>
                    ) : movie.rating === "12" ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-yellow-500 font-medium">
                        12
                      </div>
                    ) : movie.rating === "15" ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-600 font-medium">
                        15
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-red-600 font-medium">
                        19
                      </div>
                    )}
                  </div>
                  <div className="w-full text-center">
                    <h3 className="text-lg font-bold text-white">
                      {movie.korTitle}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{movie.genre}</p>
                <p className="text-sm text-gray-400">
                  상영시간: {movie.runTime}분
                </p>
                <p className="text-sm text-gray-400">
                  개봉일: {movie.movieStartDate}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="rounded bg-gray-600 p-2 text-white"
            >
              이전
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="rounded bg-gray-600 p-2 text-white"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieListPage;
