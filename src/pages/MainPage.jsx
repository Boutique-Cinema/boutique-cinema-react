import { Link } from "react-router-dom";
import { getMovieList } from "../api/movieApi";
import { useEffect, useState, useRef, useCallback } from "react";

export default function MainPage() {
  const [page, setPage] = useState(1);
  const size = 10;
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovieList(page, size);
        setMovies((prevMovies) => [...prevMovies, ...data.content]); // 배열 업데이트
        setHasMore(data.content.length === size);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    loadMovies();
  }, [page, size]);

  return (
    <>
      {/* Movie Posters Grid */}
      <div className="py-4 pt-10">
        <ul className="text-left text-2xl text-white">메인 영화</ul>
        <Link to={"/movie"}>
          <ul className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </ul>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
          {movies.slice(0, 4).map((movie, idx) => (
            <div
              key={`${movie.movieNum}-${idx}`}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <Link to={`/movie/detail/${movie.movieNum}`}>
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                    alt="Poster"
                    className="z-10 h-96 w-auto rounded-md"
                  />
                </Link>
                {/* 각 꼭짓점 부분 어둡게 처리 */}
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-br from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-bl from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tr from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tl from-black via-transparent to-transparent opacity-30" />
                <span className="absolute left-4 top-2 z-20 rotate-3 transform text-2xl text-white">
                  {idx + 1}
                </span>
              </div>

              {/* rating을 왼쪽 끝에, korTitle을 가운데 위치시키기 */}
              <div className="mt-4 flex w-full items-center justify-between">
                <span className="text-sm text-gray-300">{movie.rating}</span>
                <span className="flex-1 text-center text-2xl text-white">
                  {movie.korTitle}
                </span>
              </div>

              <span className="mt-2 text-sm text-gray-300">
                개봉일: {movie.movieStartDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* More Movies Section */}
      <div className="py-4 pt-10">
        <ul className="mt-20 text-left text-2xl text-white">
          현재상영중인 영화
        </ul>
        <Link to={"/movie"}>
          <ul className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </ul>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
          {movies.slice(0, 4).map((movie, idx) => (
            <div
              key={`${movie.movieNum}-${idx}`}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <Link to={`/movie/detail/${movie.movieNum}`}>
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                    alt="Poster"
                    className="z-10 h-96 w-auto rounded-md"
                  />
                </Link>
                {/* 각 꼭짓점 부분 어둡게 처리 */}
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-br from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-bl from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tr from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tl from-black via-transparent to-transparent opacity-30" />
                <span className="absolute left-4 top-2 z-20 rotate-3 transform text-2xl text-white">
                  {idx + 1}
                </span>
              </div>

              {/* rating을 왼쪽 끝에, korTitle을 가운데 위치시키기 */}
              <div className="mt-4 flex w-full items-center justify-between">
                <span className="text-sm text-gray-300">{movie.rating}</span>
                <span className="flex-1 text-center text-2xl text-white">
                  {movie.korTitle}
                </span>
              </div>

              <span className="mt-2 text-sm text-gray-300">
                개봉일: {movie.movieStartDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="py-4 pt-10">
        <ul className="mt-20 text-left text-2xl text-white">인기순 영화</ul>
        <Link to={"/movie"}>
          <ul className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </ul>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
          {movies.slice(0, 4).map((movie, idx) => (
            <div
              key={`${movie.movieNum}-${idx}`}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <Link to={`/movie/detail/${movie.movieNum}`}>
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                    alt="Poster"
                    className="z-10 h-96 w-auto rounded-md"
                  />
                </Link>
                {/* 각 꼭짓점 부분 어둡게 처리 */}
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-br from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-bl from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tr from-black via-transparent to-transparent opacity-30" />
                <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tl from-black via-transparent to-transparent opacity-30" />
                <span className="absolute left-4 top-2 z-20 rotate-3 transform text-2xl text-white">
                  {idx + 1}
                </span>
              </div>

              {/* rating을 왼쪽 끝에, korTitle을 가운데 위치시키기 */}
              <div className="mt-4 flex w-full items-center justify-between">
                <span className="text-sm text-gray-300">{movie.rating}</span>
                <span className="flex-1 text-center text-2xl text-white">
                  {movie.korTitle}
                </span>
              </div>

              <span className="mt-2 text-sm text-gray-300">
                개봉일: {movie.movieStartDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Theater Introduction Section */}
      <nav className="pb-28 text-white">
        <ul className="mb-4 pb-10 pt-20 text-center text-2xl font-bold">
          상영관 소개
        </ul>
        <div className="flex justify-center gap-6">
          <div className="flex-1 text-center">
            <Link to={"/greeting/theater"}>
              <img
                src="/greeting/basic.png"
                alt="일반관"
                className="h-96 w-full rounded-lg object-cover shadow-md transition-transform hover:scale-105"
              />
            </Link>
            <p className="mt-2 text-lg font-semibold">일반관</p>
          </div>
          <div className="flex-1 text-center">
            <Link to={"/greeting/couple"}>
              <img
                src="/greeting/couple.jpg"
                alt="커플관"
                className="h-96 w-full rounded-lg object-cover shadow-md transition-transform hover:scale-105"
              />
            </Link>
            <p className="mt-2 text-lg font-semibold">커플관</p>
          </div>
        </div>
      </nav>
    </>
  );
}
