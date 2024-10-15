import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

export default function Search() {
  const [keyword, setKeyword] = useState(""); // 검색어 상태 관리
  const [movies, setMovies] = useState([]); // 영화 목록 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션

  useEffect(() => {
    // 검색어가 입력될 때마다 API 요청
    if (keyword.length > 0) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get("/api/admin/movie/list", {
            params: { searchCondition: keyword },
          });
          setMovies(response.data.content); // Page 객체의 content 사용
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    } else {
      setMovies([]); // 검색어가 없으면 목록 초기화
    }
  }, [keyword]);

  const handleMovieClick = (korTitle) => {
    // 영화 제목 클릭 시, 영화 목록 페이지로 이동하며 검색어 전달
    navigate(`/movies?search=${korTitle}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={keyword} // input에 입력된 값을 상태와 연동
        onChange={(e) => setKeyword(e.target.value)}
        className="h-9 w-[250px] rounded-full border pl-3 text-black"
        placeholder="영화 검색"
      />
      <button className="absolute bottom-1.5 right-3" type="submit">
        <IoMdSearch className="h-6 w-6 text-[#393e46]" />
      </button>

      {/* 검색 결과를 보여주는 부분 */}
      {movies.length > 0 && (
        <ul className="absolute mt-2 w-[250px] rounded-lg border bg-white p-2">
          {movies.map((movie) => (
            <li
              key={movie.movieNum}
              className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-200"
              onClick={() => handleMovieClick(movie.korTitle)} // 클릭 시 함수 실행
            >
              {movie.korTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
