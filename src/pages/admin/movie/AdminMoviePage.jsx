import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { getMovieList } from "../../../api/movieApi"; // MovieAPI 임포트

const AdminMovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const pageParam = { page: page, size: 10 };
      const data = await getMovieList(pageParam); // API 호출
      console.log(data);
      setMovies(data.content); // 영화 목록 설정
      setTotalPages(data.totalPages); // 총 페이지 수 설정
    };

    fetchMovies();
  }, [page]);

  return (
    <>
      <div className="mb-4 ml-10 mt-16 text-2xl">영화 목록</div>
      <div className="mx-auto ml-7 flex max-w-[100%] flex-col">
        <div className="w-full p-4 text-white">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex-shrink-0">
              전체 공지사항: {movies.length}건
            </span>
            <div className="flex items-center">
              <button
                type="button"
                className="mr-2 flex h-8 items-center justify-center border-white bg-white p-2 text-gray-700 hover:bg-gray-200"
              >
                영화 등록
              </button>
              <select className="mr-2 h-8 p-0.5 text-gray-700 hover:bg-gray-200">
                <option>최신 순</option>
                <option>오래된 순</option>
                <option>상영관 별</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  className="h-8 w-[200px] rounded-full border pl-3 text-black"
                  placeholder="검색어를 입력하세요."
                />
                <button className="absolute right-3 mt-1" type="submit">
                  <IoMdSearch className="h-6 w-6 text-[#393e46]" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 h-[542px] overflow-auto border border-gray-500">
            <table className="w-full border-collapse border border-gray-500">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border-gray-500 px-4 py-3 text-base">번호</th>
                  <th className="border-gray-500 px-4 py-3 text-base">제목</th>
                  <th className="border-gray-500 px-4 py-3 text-base">장르</th>
                  <th className="border-gray-500 px-4 py-3 text-base">
                    상영시간
                  </th>
                  <th className="border-gray-500 px-4 py-3 text-base">
                    개봉일
                  </th>
                  <th className="border-gray-500 px-4 py-3 text-base">
                    관람등급
                  </th>
                  <th className="border-gray-500 px-4 py-3 text-base">
                    상영관
                  </th>
                  <th className="border-gray-500 px-4 py-3 text-base">
                    상영종료일
                  </th>
                  <th className="border-gray-500 px-4 py-3 text-base">
                    상영회차
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => (
                  <tr key={index} className="bg-gray-600 text-white">
                    <td className="border-gray-500 px-4 py-3">{index + 1}</td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.korTitle}
                    </td>
                    <td className="border-gray-500 px-4 py-3">{movie.genre}</td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.runTime}
                    </td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.movieStartDate}
                    </td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.rating}
                    </td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.theaterNum}
                    </td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.movieEndDate}
                    </td>
                    <td className="border-gray-500 px-4 py-3">
                      {movie.roundTime1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-16 mt-10 flex w-full justify-center">
            <button
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              &lt;&lt;
            </button>
            <button
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              이전
            </button>
            <button
              className="mx-1 whitespace-nowrap rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              다음
            </button>
            <button
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMovieListPage;
