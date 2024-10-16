import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import noticeApi from "../../api/support/noticeApi";

const NoticeListPage = () => {
  const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 (데이터를 불러오는 동안 표시)
  const [error, setError] = useState(null); // 에러 상태 (데이터 로드 중 에러 발생 시 표시)
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchExecuted, setSearchExecuted] = useState(false); // 검색 버튼이 눌렸는지 확인
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const noticesPerPage = 10; // 한 페이지당 표시할 공지사항 수

  // 날짜 형식을 "YYYY.MM.DD" 형식으로 포맷팅하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 컴포넌트가 처음 렌더링 될 때 공지사항 데이터를 불러오는 useEffect
  const fetchNoticesData = async () => {
    setLoading(true);
    setError(null);
    try {
      // API 호출을 통해 공지사항 데이터 가져오기
      const data = await noticeApi.fetchNotices(currentPage, noticesPerPage);
      // 날짜 포맷 변환 (서버에서 받아오는 날짜 데이터를 프론트엔드에서 표시할 포맷으로 변환)
      const formattedNotices = data.map((notice) => ({
        ...notice,
        nDate: formatDate(notice.nDate), // 날짜 포맷 적용
      }));
      setNotices(formattedNotices); // 가져온 데이터를 상태에 저장
    } catch (err) {
      setError(err.message); // 에러가 발생하면 에러 상태 업데이트
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  // 컴포넌트가 처음 렌더링될 때와 페이지가 변경될 때마다 공지사항을 다시 가져옴
  useEffect(() => {
    fetchNoticesData(); // 데이터를 가져오는 함수 호출
  }, [currentPage]);

  // 검색어 입력 시 호출되는 함수
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
    setSearchExecuted(false); // 검색어 입력 시 검색 결과 숨기기
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    setSearchExecuted(true); // 검색이 실행되었음을 설정
  };

  // 검색어에 맞는 공지사항을 필터링하는 함수
  const filteredNotices = notices.filter((notice) => {
    return (
      notice.nTitle &&
      notice.nTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 총 공지사항 수와 페이지 수 계산
  const totalNotices = notices.length;
  const totalPages = Math.ceil(totalNotices / noticesPerPage);

  // 페이지 번호 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages))); // 페이지 범위를 초과하지 않도록 설정
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
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
    if (previousGroupStartPage > 0) {
      setCurrentPage(previousGroupStartPage);
    } else {
      setCurrentPage(totalPages); // 첫 그룹 이전으로 넘어가지 않도록 설정
    }
  };

  // 현재 페이지 그룹의 페이지 번호 배열 생성
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
                {notices.map((notice) => (
                  <tr
                    key={notice.nnum || notice.ntitle}
                    className="border-b border-gray-600 hover:bg-gray-600"
                  >
                    <td className="border border-gray-500 px-4 py-3 text-center text-base">
                      {notice.nnum}
                    </td>
                    <td className="border border-gray-500 px-4 py-3 text-left text-base">
                      <Link
                        to={`support/notice/${notice.nnum}`}
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-200 hover:underline"
                      >
                        {notice.ntitle.length > 30
                          ? `${notice.ntitle.substring(0, 30)}...`
                          : notice.ntitle}
                      </Link>
                    </td>
                    <td className="border border-gray-500 px-4 py-3 text-center text-base">
                      {formatDate(notice.ndate)}
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
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              &lt;
            </button>
            {pageSequence.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 rounded border px-2 py-1 ${
                  page === currentPage
                    ? "bg-gray-600 text-white"
                    : "border-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              &gt;
            </button>
            <button
              onClick={handleLastGroup}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeListPage;
