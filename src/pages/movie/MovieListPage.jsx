import { Link } from "react-router-dom";
import { getMovieList } from "../../api/movieApi";
import { useEffect, useState, useRef, useCallback } from "react";

const MovieListPage = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const [hasMore, setHasMore] = useState(true);
  const [movie, setMovie] = useState([]); // 초기값을 빈 배열로 설정
  const observer = useRef();

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
    [hasMore],
  );

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovieList(page, size);
        setMovie((prevMovies) => [...prevMovies, ...data.content]); // 배열 업데이트
        setHasMore(data.content.length === size);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    loadMovies();
  }, [page, size]);

  return (
    <div className="py-4 pb-36 pt-10">
      <h1 className="pb-20 pl-2 text-left text-2xl text-white">전체 영화</h1>
      <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
        {movie.map((movie, idx) => (
          <div
            key={`${movie.movieNum}-${idx}`}
            className="flex flex-col items-center"
            ref={movie.length === idx + 1 ? lastMovieElementRef : null}
          >
            <div className="relative">
              <Link to={`/movie/detail/${movie.movieNum}`}>
                <img
                  src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                  alt="Poster"
                  className="h-96 w-auto cursor-pointer rounded-md object-cover"
                />
              </Link>
            </div>
            <div className="mt-4 text-center text-2xl text-white">
              {movie.korTitle}
            </div>
            <div className="mt-6 flex w-full flex-col items-start text-left">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-300">{movie.rating}</span>
                  <span className="text-sm text-gray-300">
                    <span>개봉일: </span>
                    {movie.movieStartDate}
                  </span>
                </div>
                <Link
                  to={`/reservation/${movie.movieNum}`}
                  className="ml-4 rounded bg-emerald-500 px-4 py-2 text-center text-white"
                >
                  예매하기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;
