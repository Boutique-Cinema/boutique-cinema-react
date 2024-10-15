import React, { useState, useEffect } from "react"; // useState와 useEffect를 import
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io"; // IoMdSearch 아이콘 import

const NoticeListPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchExecuted, setSearchExecuted] = useState(false); // 검색 버튼이 눌렸는지 확인
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchNotices = () => {
      try {
        // 테스트용 공지사항 데이터 생성
        const fakeNotices = Array.from({ length: 1000 }, (_, index) => ({
          id: index + 1,
          title: `공지사항 제목 ${index + 1}`,
          date: new Date(2024, 8, index + 1).toISOString(), // 2024년 9월의 날짜
        }));
        setNotices(fakeNotices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchExecuted(false); // 검색어 입력 시 검색 결과 숨기기
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchExecuted(true); // 검색이 실행되었음을 설정
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice,
  );

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">오류 발생: {error}</div>;
  }

  const totalNotices = notices.length;
  const totalPages = Math.ceil(totalNotices / noticesPerPage);

  // 페이지 수열 생성 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // << 버튼 클릭 시 이전 페이지 그룹의 마지막 페이지로 이동
  const handleFirstGroup = () => {
    const startGroupPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const previousGroupStartPage = startGroupPage - 5;
    if (previousGroupStartPage > 0) {
      setCurrentPage(previousGroupStartPage);
    } else {
      setCurrentPage(1); // 첫 그룹 이전으로 넘어가지 않도록 설정
    }
  };

  // >> 버튼 클릭 시 이전 페이지 그룹의 마지막 페이지로 이동
  const handleLastGroup = () => {
    const startGroupPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const previousGroupStartPage = startGroupPage + 5;
    if (previousGroupStartPage <= totalPages) {
      setCurrentPage(previousGroupStartPage);
    } else {
      setCurrentPage(totalPages); // 마지막 페이지로 넘어가도록 설정
    }
  };

  const pageSequence = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
      return startPage + index;
    },
  ).filter((page) => page <= totalPages);

  return (
    <>
      <div className="mb-4 ml-10 mt-16 text-2xl">공지사항</div>
      <div className="mx-auto ml-7 flex max-w-[100%]">
        <div className="w-full p-4 text-white">
          <div className="flex items-center justify-between">
            <span className="flex-shrink-0">
              전체 공지사항: {totalNotices}건
            </span>
            {searchExecuted && (
              <span className="flex-grow text-center">
                검색 결과: {filteredNotices.length}건
              </span>
            )}
            <div className="relative ml-4">
              <input
                type="text"
                className="mb-2 h-8 w-[200px] rounded-full border pl-3 text-black"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <button
                className="absolute bottom-1.5 right-3 mb-1"
                type="submit"
                onClick={handleSearch}
              >
                <IoMdSearch className="h-6 w-6 text-[#393e46]" />
              </button>
            </div>
          </div>
          <div className="mt-4 h-[541px] overflow-auto border border-gray-500">
            <table className="w-full border-collapse border border-gray-500">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="w-1/5 border border-gray-500 px-4 py-3 text-base">
                    번호
                  </th>
                  <th className="w-3/5 border border-gray-500 px-4 py-3 text-base">
                    제목
                  </th>
                  <th className="w-1/5 border border-gray-500 px-4 py-3 text-base">
                    등록일
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    className="border-b border-gray-600 hover:bg-gray-600"
                  >
                    <td className="border border-gray-500 px-4 py-3 text-center text-base">
                      {indexOfFirstNotice + index + 1}
                    </td>
                    <td className="border border-gray-500 px-4 py-3 text-left text-base">
                      <Link
                        to={`detail/${notice.id}`}
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-200 hover:underline"
                      >
                        {notice.title.length > 30
                          ? `${notice.title.substring(0, 30)}...`
                          : notice.title}
                      </Link>
                    </td>
                    <td className="border border-gray-500 px-4 py-3 text-center text-base">
                      {formatDate(notice.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 페이지네이션 */}
          <div className="mb-16 ml-56 mt-10 flex max-w-[50%] items-center justify-center">
            <button
              onClick={handleFirstGroup}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              &lt;&lt;
            </button>
            <button
              onClick={handlePrevious}
              className="mx-1 whitespace-nowrap rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              이전
            </button>
            {pageSequence.map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex)}
                className={`mx-1 rounded border border-gray-500 px-2 py-1 text-white ${currentPage === pageIndex ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
              >
                {pageIndex}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="mx-1 whitespace-nowrap rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              다음
            </button>
            <button
              onClick={handleLastGroup}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              &gt;&gt;
            </button>
          </div>
          <div>글 등록하기</div>
        </div>
      </div>
    </>
  );
};

export default NoticeListPage;
