import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNoticeList } from "../../api/noticeApi";

const AdminNoticeListPage = () => {
  const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장하는 상태
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [size, setSize] = useState(10); // 한 페이지에 표시할 공지사항 수
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태
  const [totalNotices, setTotalNotices] = useState(0); // 전체 공지사항 수 상태 추가
  const maxPageButtons = 5;
  const [loading, setLoading] = useState(true); // 로딩 상태 (데이터를 불러오는 동안 표시)
  const navigate = useNavigate();

  // 날짜 형식을 "YYYY.MM.DD" 형식으로 포맷팅하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 공지사항 목록 불러오기
  const fetchNotices = async () => {
    setLoading(true);
    const data = await getNoticeList(page, size);
    setNotices(data.content || []); // 응답 데이터에서 공지사항 목록 설정
    setTotalPages(data.totalPages); // 전체 페이지 수 설정
    setLoading(false);
  };

  // 페이지가 변경될 때마다 데이터를 불러옴
  useEffect(() => {
    fetchNotices(page);
  }, [page]);

  // 페이지 그룹 계산 (최대 5개의 페이지 번호를 보여줌)
  const pageSequence = Array.from(
    { length: Math.min(totalPages, maxPageButtons) },
    (_, index) => {
      const startPage =
        Math.floor((page - 1) / maxPageButtons) * maxPageButtons + 1;
      return startPage + index;
    },
  ).filter((p) => p <= totalPages);

  // 공지사항 등록 후 새로 고침
  const handleRegister = () => {
    fetchNotices(); // 등록 후 페이지 1로 리셋하거나, fetchNotices를 다시 호출해서 최신 공지사항 반영 또는 setPage(1);을 호출해서 처음 페이지로 리셋할 수도 있음
    navigate("/admin/support/notice/register"); // 등록 후 다시 목록 페이지로 이동
  };

  // 공지사항 목록이 없거나 빈 배열일 때 처리
  if (!notices || notices.length === 0) {
    return (
      <div className="mt-10 text-center text-white">
        <p>공지사항이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 ml-10 mt-16 text-2xl">공지사항</div>
      <div className="mx-auto ml-7 flex max-w-[100%]">
        <div className="w-full p-4 text-white">
          <div className="flex items-center justify-between">
            <span className="flex-shrink-0">
              전체 공지사항: {totalNotices}건
            </span>

            <button className="relative ml-4" onClick={handleRegister}>
              등록하기
            </button>
          </div>
          <div className="mt-4 overflow-auto border border-gray-500">
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
                        to={`${notice.nnum}`}
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
              onClick={() => setPage(1)}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
              disabled={page === 1}
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
            >
              이전
            </button>
            {pageSequence.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`mx-1 rounded border px-2 py-1 ${
                  p === page
                    ? "bg-gray-600 text-white"
                    : "border-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
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

export default AdminNoticeListPage;
