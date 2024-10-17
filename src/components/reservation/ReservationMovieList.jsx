import React, { useState } from "react";

export default function ReservationMovieList({ movies, handleMovieSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 중복 제거 필터링
  const uniqueMovies = movies.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.korTitle === movie.korTitle),
  );

  return (
    <div className="h-full w-full overflow-auto">
      <ul className="min-h-full rounded bg-gray-500">
        {uniqueMovies.map((movie, index) => (
          <li
            key={movie.movieNum}
            className={`flex cursor-pointer items-center justify-between border-b border-gray-400 px-4 py-3 last:border-b-0 ${selectedIndex === index ? "bg-tertiary" : ""}`}
            onClick={() => {
              handleMovieSelect(movie.korTitle);
              setSelectedIndex(index);
            }}
          >
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
              {movie.korTitle}
            </div>
            <div className="text-sm">{movie.genre}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
