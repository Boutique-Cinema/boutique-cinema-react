import React, { useState, useEffect, useRef, useCallback } from "react";
import { getMovieList } from "../../api/movieApi"; // fetchMoviesBySearch 추가
import { useLocation, useNavigate } from "react-router-dom";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("최신 순");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchCondition = queryParams.get("search");

  const navigate = useNavigate();
  const observer = useRef();

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async (page, size) => {
    let data;
    if (searchCondition) {
      // 검색어가 있을 경우 검색 결과를 가져옴
      data = await getMovieList(page, size, searchCondition);
    } else {
      // 검색어가 없으면 모든 영화를 가져옵니다
      data = await getMovieList(page, size);
    }
    setMovies(data.content); // 기존 영화에 새 영화 추가
    setHasMore(data.content.length === size); // 더 가져올 페이지가 있는지 확인
  };

  // useEffect로 영화 데이터를 불러옴
  useEffect(() => {
    setMovies([]); // 검색 시 기존 영화 목록 초기화
    fetchMovies(1, size); // 첫 페이지 불러오기
  }, [searchCondition, sortOrder, size]); // searchCondition, sortOrder, size가 변경되면 다시 호출

  // 무한 스크롤 설정
  const lastMovieElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore], // hasMore가 변경되면 다시 실행
  );

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page, size); // 페이지가 변경되면 영화 데이터 불러오기
    }
  }, [page]); // page가 변경될 때마다 실행

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie, index) => {
          const isLastMovie = index === movies.length - 1;
          return (
            <div
              key={`${movie.movieNum}-${index}`} // movieNum + index 조합하여 고유한 key 생성
              className="relative cursor-pointer rounded-lg border border-gray-300 bg-gray-800 p-4 shadow-lg hover:bg-gray-700"
              onClick={() => navigate(`/movie/${movie.movieNum}`)}
              ref={isLastMovie ? lastMovieElementRef : null}
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
          );
        })}
      </div>
    </div>
  );
};

export default MovieListPage;
