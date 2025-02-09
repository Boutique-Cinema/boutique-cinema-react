import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotice } from "../../api/noticeApi";

const NoticeDetailPage = () => {
  // navigate 훅 사용
  const navigate = useNavigate();

  // 공지사항 세부 정보 상태 설정
  const [notice, setNotice] = useState(null);
  const { nnum } = useParams(); // URL 파라미터에서 공지사항 번호로 조회
  const [loading, setLoading] = useState(true);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 공지사항 세부 정보 불러오기
  const fetchNoticeDetail = async () => {
    setLoading(true);
    try {
      const noticeData = await getNotice(nnum); // 서버에서 공지사항 불러옴
      setNotice(noticeData); // 상태 업데이트
    } catch (error) {
      console.error("공지사항 데이터 가져오기 실패:", error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // nnum이 바뀔 때마다 세부 정보 불러오기
  useEffect(() => {
    if (nnum) {
      fetchNoticeDetail();
    }
  }, [nnum]); // nnum 값이 변경될 때마다 호출

  return (
    <>
      {notice ? (
        <>
          <h1 className="mb-6 ml-10 mt-8 border-gray-300 text-left text-3xl font-bold text-gray-200">
            {notice.ntitle}
          </h1>

          <p className="ml-10 mt-8 border-gray-300 text-left text-base text-gray-200">
            작성일: {formatDate(notice.ndate)}
          </p>

          <div className="mx-auto mb-32 ml-10 mt-4 w-full max-w-[calc(100%-2.5rem)] rounded-lg border-2 bg-none px-10 shadow-lg">
            <div className="mt-8 h-[530px] max-w-full overflow-y-auto px-8 py-6 text-lg leading-relaxed text-gray-100">
              {notice.ncontent}
            </div>

            <div className="flex w-full justify-center border-t-2 border-gray-300 pt-4">
              <button
                onClick={() => navigate("/support/notice")} // 목록 페이지로 이동
                className="mb-4 rounded-lg bg-gray-500 px-6 py-2 text-white transition hover:bg-cyan-800"
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>공지사항을 불러올 수 없습니다.</p>
      )}
    </>
  );
};

export default NoticeDetailPage;
