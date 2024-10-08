import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { getMovieList } from "../../../api/movieApi"; // MovieAPI 임포트

const AdminMovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await getMovieList({
          page: currentPage, // 현재 페이지
          size: moviesPerPage, // 페이지당 영화 수
        });
        setMovies(response.content); // 영화 목록 저장
        setTotalMovies(response.totalElements); // 전체 영화 수 저장
        setTotalPages(Math.ceil(response.totalElements / moviesPerPage)); // 전체 페이지 수 계산
      } catch (err) {
        setError(err.message); // 오류 발생 시 상태 업데이트
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchMovies(); // 영화 목록 가져오기 함수 호출
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  // 검색어 변경 시 상태 업데이트
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 업데이트
    setSearchExecuted(false); // 검색어 입력 시 검색 결과 숨기기
  };

  // 검색 버튼 클릭 시 실행
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchExecuted(true); // 검색이 실행되었음을 설정
  };

  // 검색어를 포함한 영화 목록 필터링
  const filteredMovies = movies.filter((movie) =>
    movie.korTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages))); // 페이지 범위 체크
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1); // 현재 페이지에서 1 감소
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1); // 현재 페이지에서 1 증가
    }
  };

  // << 버튼 클릭 시 이전 페이지 그룹의 마지막 페이지로 이동
  const handleFirstGroup = () => {
    const startGroupPage = Math.floor((currentPage - 1) / 5) * 5 + 1; // 현재 그룹의 시작 페이지
    const previousGroupStartPage = startGroupPage - 5; // 이전 그룹의 시작 페이지
    if (previousGroupStartPage > 0) {
      setCurrentPage(previousGroupStartPage); // 이전 그룹의 마지막 페이지로 설정
    } else {
      setCurrentPage(1); // 첫 그룹 이전으로 넘어가지 않도록 설정
    }
  };

  // >> 버튼 클릭 시 다음 페이지 그룹의 첫 페이지로 이동
  const handleLastGroup = () => {
    const startGroupPage = Math.floor((currentPage - 1) / 5) * 5 + 1; // 현재 그룹의 시작 페이지
    const nextGroupStartPage = startGroupPage + 5; // 다음 그룹의 시작 페이지
    if (nextGroupStartPage <= totalPages) {
      setCurrentPage(nextGroupStartPage); // 다음 그룹의 첫 페이지로 설정
    } else {
      setCurrentPage(totalPages); // 마지막 페이지로 이동
    }
  };

  // 현재 페이지에 따라 표시할 페이지 수열 생성
  const pageSequence = Array.from(
    { length: Math.min(totalPages, 5) }, // 최대 5페이지까지 표시
    (_, index) => {
      const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1; // 현재 그룹의 시작 페이지
      return startPage + index; // 시작 페이지부터 인덱스 추가
    },
  ).filter((page) => page <= totalPages); // 전체 페이지 수 체크

  // 로딩 중일 때
  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  // 오류 발생 시
  if (error) {
    return <div className="text-red-500">오류 발생: {error}</div>;
  }

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
                {filteredMovies
                  .slice(
                    (currentPage - 1) * moviesPerPage,
                    currentPage * moviesPerPage,
                  )
                  .map((movie, index) => (
                    <tr
                      key={movie.movieNum}
                      className="border-b border-gray-600 hover:bg-gray-600"
                    >
                      <td className="border border-gray-500 px-4 py-3 text-center">
                        {index + 1 + (currentPage - 1) * moviesPerPage}{" "}
                        {/* 현재 페이지의 인덱스 계산 */}
                      </td>
                      <td className="border border-gray-500 px-4 py-3 text-left">
                        <Link
                          to={`/admin/movie/${movie.movieNum}`}
                          className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-200 hover:underline"
                        >
                          {movie.korTitle.length > 30
                            ? `${movie.korTitle.substring(0, 30)}...`
                            : movie.korTitle}{" "}
                          {/* 제목이 30자 이상일 경우 생략 */}
                        </Link>
                      </td>
                      <td className="border border-gray-500 px-4 py-3 text-center">
                        {movie.genre} {/* 영화 장르 */}
                      </td>
                      <td className="border border-gray-500 px-4 py-3 text-center">
                        {movie.runTime} 분 {/* 상영 시간 */}
                      </td>
                      <td className="border border-gray-500 px-4 py-3 text-center">
                        {formatDate(movie.movieStartDate)} {/* 개봉일 포맷 */}
                      </td>
                      <td className="border border-gray-500 px-4 py-3 text-center">
                        {movie.theaterNum} {/* 상영관 번호 */}
                      </td>
                      <td className="border border-gray-500 px-4 py-3 text-center">
                        <Link
                          to={`/admin/movie/${movie.movieNum}`}
                          className="text-blue-500"
                        >
                          상세보기 {/* 상세보기 링크 */}
                        </Link>
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

// export default AdminMovieListPage; // AdminMovieListPage 컴포넌트 내보내기

// import React, { useState, useEffect } from "react";
// import { IoMdSearch } from "react-icons/io";
// import { getMovieList } from "../../../api/movieApi"; // MovieAPI 임포트

// const AdminMovieListPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const pageParam = { page: page, size: 10 };
//       const data = await getMovieList(pageParam); // API 호출
//       console.log(data);
//       setMovies(data.content); // 영화 목록 설정
//       setTotalPages(data.totalPages); // 총 페이지 수 설정
//     };

//     fetchMovies();
//   }, [page]);

//   return (
//     <>
//       <div className="mb-4 ml-10 mt-16 text-2xl">영화 목록</div>
//       <div className="mx-auto ml-7 flex max-w-[100%] flex-col">
//         <div className="w-full p-4 text-white">
//           <div className="mb-4 flex items-center justify-between">
//             <span className="flex-shrink-0">
//               전체 공지사항: {movies.length}건
//             </span>
//             <div className="flex items-center">
//               <button
//                 type="button"
//                 className="mr-2 flex h-8 items-center justify-center border-white bg-white p-2 text-gray-700 hover:bg-gray-200"
//               >
//                 영화 등록
//               </button>
//               <select className="mr-2 h-8 p-0.5 text-gray-700 hover:bg-gray-200">
//                 <option>최신 순</option>
//                 <option>오래된 순</option>
//                 <option>상영관 별</option>
//               </select>
//               <div className="relative">
//                 <input
//                   type="text"
//                   className="h-8 w-[200px] rounded-full border pl-3 text-black"
//                   placeholder="검색어를 입력하세요."
//                 />
//                 <button className="absolute right-3 mt-1" type="submit">
//                   <IoMdSearch className="h-6 w-6 text-[#393e46]" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 h-[542px] overflow-auto border border-gray-500">
//             <table className="w-full border-collapse border border-gray-500">
//               <thead>
//                 <tr className="bg-gray-700 text-white">
//                   <th className="border-gray-500 px-4 py-3 text-base">번호</th>
//                   <th className="border-gray-500 px-4 py-3 text-base">제목</th>
//                   <th className="border-gray-500 px-4 py-3 text-base">장르</th>
//                   <th className="border-gray-500 px-4 py-3 text-base">
//                     상영시간
//                   </th>
//                   <th className="border-gray-500 px-4 py-3 text-base">
//                     개봉일
//                   </th>
//                   <th className="border-gray-500 px-4 py-3 text-base">
//                     관람등급
//                   </th>
//                   <th className="border-gray-500 px-4 py-3 text-base">
//                     상영관
//                   </th>
//                   <th className="border-gray-500 px-4 py-3 text-base">
//                     상영종료일
//                   </th>
//                   <th className="border-gray-500 px-4 py-3 text-base">
//                     상영회차
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {movies.map((movie, index) => (
//                   <tr key={index} className="bg-gray-600 text-white">
//                     <td className="border-gray-500 px-4 py-3">{index + 1}</td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.korTitle}
//                     </td>
//                     <td className="border-gray-500 px-4 py-3">{movie.genre}</td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.runTime}
//                     </td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.movieStartDate}
//                     </td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.rating}
//                     </td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.theaterNum}
//                     </td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.movieEndDate}
//                     </td>
//                     <td className="border-gray-500 px-4 py-3">
//                       {movie.roundTime1}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mb-16 mt-10 flex w-full justify-center">
//             <button
//               className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
//               onClick={() => setPage(1)}
//               disabled={page === 1}
//             >
//               &lt;&lt;
//             </button>
//             <button
//               className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
//               onClick={() => setPage(page - 1)}
//               disabled={page === 1}
//             >
//               이전
//             </button>
//             <button
//               className="mx-1 whitespace-nowrap rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
//               onClick={() => setPage(page + 1)}
//               disabled={page === totalPages}
//             >
//               다음
//             </button>
//             <button
//               className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
//               onClick={() => setPage(totalPages)}
//               disabled={page === totalPages}
//             >
//               &gt;&gt;
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminMovieListPage;
