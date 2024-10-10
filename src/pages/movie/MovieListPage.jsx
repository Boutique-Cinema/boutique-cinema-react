import { Link, useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../api/movie/movieApi";
import { useEffect, useState, useRef, useCallback } from "react";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const size = 10; // 한 페이지에 보여줄 영화 수
  const [hasMore, setHasMore] = useState(true); // 더 불러올 영화가 있는지 확인

  // 마지막 요소 참조를 위한 ref
  const observer = useRef();

  // 무한 스크롤 핸들링 함수
  const lastMovieElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore],
  );

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(page, size); // 현재 페이지와 크기를 전달
        setMovies((prevMovies) => [...prevMovies, ...data.content]); // 이전 데이터에 추가
        setHasMore(data.content.length === size); // 더 가져올 영화가 있는지 확인
      } catch (error) {
        console.error("영화를 가져오는 데 오류가 발생했습니다:", error);
      }
    };

    loadMovies();
  }, [page, size]);

  return (
    <div className="py-4 pb-36 pt-10">
      <h1 className="pb-20 pl-2 text-left text-2xl text-white">전체 영화</h1>
      <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
        {movies.map((movie, idx) => {
          if (movies.length === idx + 1) {
            return (
              <div
                ref={lastMovieElementRef} // 마지막 요소에 ref를 연결
                key={movie.movieNum}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <Link to={`/movie/detail/${movie.movieNum}`}>
                    <img
                      src={movie.posterUrl}
                      className="h-96 w-auto cursor-pointer rounded-md object-cover"
                    />
                  </Link>
                  <span className="absolute left-4 top-2 rotate-3 transform text-2xl text-white">
                    {movie.movieNum}
                  </span>
                </div>
                <div className="mt-4 text-center text-2xl text-white">
                  {movie.korTitle}
                </div>
                <div className="mt-6 flex w-full flex-col items-start text-left">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        {movie.rating}
                      </span>
                      <span className="text-sm text-gray-300">
                        <span>개봉일: </span>
                        {movie.movieStartDate}
                      </span>
                    </div>
                    <Link
                      to={`/reservation/${movie.movieNum}`}
                      className="ml-4 rounded bg-gray-500 px-4 py-2 text-center text-white"
                    >
                      예매하기
                    </Link>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={movie.movieNum} className="flex flex-col items-center">
                <div className="relative">
                  <Link to={`/movie/detail/${movie.movieNum}`}>
                    <img
                      src={movie.posterUrl}
                      className="h-96 w-auto cursor-pointer rounded-md object-cover"
                    />
                  </Link>
                  <span className="absolute left-4 top-2 rotate-3 transform text-2xl text-white">
                    {movie.movieNum}
                  </span>
                </div>
                <div className="mt-4 text-center text-2xl text-white">
                  {movie.korTitle}
                </div>
                <div className="mt-6 flex w-full flex-col items-start text-left">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">
                        {movie.rating}
                      </span>
                      <span className="text-sm text-gray-300">
                        <span>개봉일: </span>
                        {movie.movieStartDate}
                      </span>
                    </div>
                    <Link
                      to={`/reservation/${movie.movieNum}`}
                      className="ml-4 rounded bg-gray-500 px-4 py-2 text-center text-white"
                    >
                      예매하기
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MovieListPage;
