import { Link } from "react-router-dom";
import { getMovieList, fetchSortedMovies } from "../api/movieApi";
import { getAllReservations } from "../api/reservationApi";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [page, setPage] = useState(1);
  const size = 10;
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState([]); // 모든 영화 목록 초기화
  const [sortedMovies, setSortedMovies] = useState([]); // 최신순 영화 목록
  const [reservations, setReservations] = useState([]); // 예약 목록

  // 모든 영화 목록 로드
  useEffect(() => {
    const loadMovies = async () => {
      const data = await getMovieList(page, size);
      setMovies((prevMovies) => [...prevMovies, ...data.content]); // 배열 업데이트
      setHasMore(data.content.length === size);
    };

    loadMovies();
  }, [page, size]);

  // 최신순 영화 목록 로드
  useEffect(() => {
    const loadLatestMovies = async () => {
      const data = await fetchSortedMovies(page, size, "개봉일 순"); // 개봉일 순 추가

      // 중복 제거: korTitle 기준으로 필터링
      const uniqueMovies = data.content.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.korTitle === movie.korTitle),
      );

      // 개봉일 역순 정렬
      const sortedMovies = uniqueMovies.sort((a, b) => {
        return new Date(b.movieStartDate) - new Date(a.movieStartDate);
      });

      setSortedMovies(sortedMovies);
      setHasMore(sortedMovies.length === size);
    };

    loadLatestMovies();
  }, [page]);

  // 예약 목록 로드
  useEffect(() => {
    const loadReservations = async () => {
      const data = await getAllReservations();
      setReservations(data); // 예약 데이터 저장
    };

    loadReservations();
  }, []);

  // 예약 수에 따라 영화 정렬 및 중복 영화 필터링
  const sortedByReservations = movies
    .map((movie) => {
      const reservationCount = reservations.filter(
        (reservation) =>
          reservation.movieNum === movie.movieNum &&
          reservation.cancelDate !== "취소",
      ).length;
      return { ...movie, reservationCount };
    })
    .sort((a, b) => b.reservationCount - a.reservationCount) // 예약 수 기준으로 정렬
    .filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.korTitle === movie.korTitle),
    ); // 제목으로 중복 필터링, 예약 수로 정렬된 상태에서 첫 번째 인스턴스만 남기

  return (
    <>
      {/* Movie Posters Grid */}
      <div>
        <div className="mt-10 text-left text-2xl text-white">메인 영화</div>
        <Link to={"/movie/list"}>
          <div className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </div>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-4 md:grid-cols-4">
          {movies.slice(0, 4).map((movie, idx) => (
            <div
              key={`${movie.movieNum}-${idx}`}
              className="relative cursor-pointer rounded-lg border border-gray-300 bg-gray-800 p-4 shadow-lg hover:bg-gray-700"
            >
              <div className="relative">
                <Link to={`/movie/${movie.movieNum}`}>
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                    alt="Poster"
                    className="h-80 w-full rounded-md object-cover"
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
                <div className="flex gap-3">
                  {/* 관람등급 표시 */}
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
                <span className="flex-1 text-center text-lg text-white">
                  {movie.korTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Movies Section */}
      <div className="py-4 pt-10">
        <div className="mt-20 text-left text-2xl text-white">
          현재상영중인 영화
        </div>
        <Link to={"/movie/list"}>
          <div className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </div>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-4 md:grid-cols-4">
          {sortedMovies.slice(0, 4).map((movie, idx) => (
            <div
              key={`${movie.movieNum}-${idx}`}
              className="relative cursor-pointer rounded-lg border border-gray-300 bg-gray-800 p-4 shadow-lg hover:bg-gray-700"
            >
              <div className="relative">
                <Link to={`/movie/${movie.movieNum}`}>
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                    alt="Poster"
                    className="h-80 w-full rounded-md object-cover"
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
                <div className="flex gap-3">
                  {/* 관람등급 표시 */}
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
                <span className="flex-1 text-center text-lg text-white">
                  {movie.korTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="py-4 pt-10">
        <div className="mt-20 text-left text-2xl text-white">인기순 영화</div>
        <Link to={"/movie/list"}>
          <div className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </div>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-4 md:grid-cols-4">
          {sortedByReservations.slice(0, 4).map((movie, idx) => (
            <div
              key={`${movie.movieNum}-${idx}`}
              className="relative cursor-pointer rounded-lg border border-gray-300 bg-gray-800 p-4 shadow-lg hover:bg-gray-700"
            >
              <div className="relative">
                <Link to={`/movie/${movie.movieNum}`}>
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                    alt="Poster"
                    className="h-80 w-full rounded-md object-cover"
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
                <div className="flex gap-3">
                  {/* 관람등급 표시 */}
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
                <span className="flex-1 text-center text-lg text-white">
                  {movie.korTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theater Introduction Section */}
      <nav className="pb-28 text-white">
        <div className="mb-4 pb-10 pt-20 text-center text-2xl font-bold">
          상영관 소개
        </div>
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
