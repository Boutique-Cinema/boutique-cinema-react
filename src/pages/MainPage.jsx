import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  const movies = [
    {
      id: 1,
      title: "조커",
      image: "/joker.jpg",
      rating: "15세 이상 관람가",
      releaseDate: "2019-10-04",
    },
    {
      id: 2,
      title: "대도시의 사랑법",
      image: "/love.jpg",
      rating: "12세 이상 관람가",
      releaseDate: "2021-09-22",
    },
    {
      id: 3,
      title: "베테랑",
      image: "/veterang.jpg",
      rating: "15세 이상 관람가",
      releaseDate: "2015-12-24",
    },
    {
      id: 4,
      title: "Hello, Asterum!",
      image: "/hello.jpg",
      rating: "전체 관람가",
      releaseDate: "2022-01-01",
    },
  ];

  return (
    <>
      {/* Movie Posters Grid */}
      <div className="py-4 pt-10">
        <ul className="pl-4 text-left text-2xl text-white">메인 영화</ul>
        <Link to={"/movie"}>
          <ul className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </ul>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
          {movies.map((movie, idx) => (
            <div key={movie.id} className="flex flex-col items-center">
              <div className="relative">
                <Link to="#">
                  <img
                    src={movie.image}
                    alt={`${movie.title} 포스터`}
                    className="h-96 w-auto rounded-md"
                  />
                </Link>
                {/* 각 꼭짓점 부분만 어두워지도록 설정 */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-bl from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tl from-black via-transparent to-transparent opacity-30" />
                <span className="absolute left-4 top-2 rotate-3 transform text-2xl text-white">
                  {idx + 1}
                </span>
              </div>
              <span className="mt-4 text-center text-2xl text-white">
                {movie.title}
              </span>
              <div className="mt-6 flex w-full flex-col items-start text-left">
                <span className="text-sm text-gray-300">{movie.rating}</span>
                <span className="text-sm text-gray-300">
                  <span>개봉일: </span>
                  {movie.releaseDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Movies Section */}
      <div className="py-4 pt-20">
        <ul className="pl-4 text-left text-2xl">현재 상영중인 영화</ul>
        <Link to={"/movie"}>
          <ul className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </ul>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
          {movies.map((movie, idx) => (
            <div key={movie.id} className="flex flex-col items-center">
              <div className="relative">
                <Link to="#">
                  <img
                    src={movie.image}
                    alt={`${movie.title} 포스터`}
                    className="h-96 w-auto rounded-md"
                  />
                </Link>
                {/* 각 꼭짓점 부분만 어두워지도록 설정 */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-bl from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tl from-black via-transparent to-transparent opacity-30" />
                <span className="absolute left-4 top-2 rotate-3 transform text-2xl text-white">
                  {idx + 1}
                </span>
              </div>
              <span className="mt-4 text-center text-2xl text-white">
                {movie.title}
              </span>
              <div className="mt-6 flex w-full flex-col items-start text-left">
                <span className="text-sm text-gray-300">{movie.rating}</span>
                <span className="text-sm text-gray-300">
                  <span>개봉일: </span>
                  {movie.releaseDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="py-4 pt-20">
        <ul className="pl-4 text-left text-2xl text-gray-100">
          인기 순위 Best4 영화
        </ul>
        <Link to={"/movie"}>
          <ul className="py-4 pb-4 pr-2 text-right text-lg text-white">
            더 많은 영화보기+
          </ul>
        </Link>
        <div className="container mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
          {movies.map((movie, idx) => (
            <div key={movie.id} className="flex flex-col items-center">
              <div className="relative">
                <Link to="#">
                  <img
                    src={movie.image}
                    alt={`${movie.title} 포스터`}
                    className="h-96 w-auto rounded-md"
                  />
                </Link>
                {/* 각 꼭짓점 부분만 어두워지도록 설정 */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-bl from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-black via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tl from-black via-transparent to-transparent opacity-30" />
                <span className="absolute left-4 top-2 rotate-3 transform text-2xl text-white">
                  {idx + 1}
                </span>
              </div>
              <span className="mt-4 text-center text-2xl text-white">
                {movie.title}
              </span>
              <div className="mt-6 flex w-full flex-col items-start text-left">
                <span className="text-sm text-gray-300">{movie.rating}</span>
                <span className="text-sm text-gray-300">
                  <span>개봉일: </span>
                  {movie.releaseDate}
                </span>
              </div>
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
