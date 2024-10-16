import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
    <div>
      {notice ? (
        <div>
          <h1 className="mb-4 text-2xl font-bold">{notice.ntitle}</h1>
          <p className="mb-2 text-gray-500">{formatDate(notice.ndate)}</p>
          <div className="text-lg leading-relaxed">{notice.ncontent}</div>
          <button
            onClick={() => navigate("/support")} // 목록 페이지로 이동
            className="mt-4 inline-block text-blue-500"
          >
            목록으로 돌아가기
          </button>
        </div>
      ) : (
        <p>공지사항을 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default NoticeDetailPage;
