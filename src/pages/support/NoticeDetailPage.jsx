import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import noticeApi from "../../api/support/noticeApi";

const NoticeDetailPage = () => {
  // URL 파라미터에서 ID 가져오기
  const { nnum } = useParams();

  // navigate 훅 사용
  const navigate = useNavigate();

  // 공지사항 세부 정보 상태 설정
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 공지사항 세부 정보 불러오기
  const fetchNoticeDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await noticeApi.readNotice(nnum); // 서버에서 공지사항 불러옴
      setNotice(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // nnum이 바뀔 때마다 세부 정보 불러오기
  useEffect(() => {
    if (nnum) {
      fetchNoticeDetail();
    }
  }, [nnum]); // nnum 값이 변경될 때마다 호출

  if (loading) return <p>로딩 중...</p>;

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {notice ? (
        <>
          {/* 제목 부분 */}
          <h1 className="mb-8 border-b-2 border-gray-300 text-left text-3xl font-bold text-gray-200">
            {notice.ntitle}
          </h1>

          {/* 내용 부분 */}
          <div className="mx-auto mt-8 w-4/5 max-w-full rounded-lg border-2 px-10 shadow-lg">
            <div className="h-[600px] max-w-full overflow-y-auto px-8 py-6 text-lg leading-relaxed text-gray-200">
              {/* 내용이 길어지면 스크롤 발생 */}
              {notice.ncontent}
            </div>

            {/* 목록으로 돌아가기 버튼 (양끝에 선이 닿도록) */}
            <div className="flex w-full justify-center border-t-2 border-gray-300 pt-4">
              <div className="w-full">
                <button
                  onClick={() => navigate("/support")} // 목록 페이지로 이동
                  className="rounded-lg bg-cyan-700 px-6 py-2 text-white transition hover:bg-cyan-800"
                >
                  목록으로 돌아가기
                </button>
              </div>
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
