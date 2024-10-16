import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import noticeApi from "../../api/support/noticeApi";

const AdminNoticeDetail = () => {
  const { nnum } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const fetchNoticeDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await noticeApi.readNotice(nnum);
      setNotice(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nnum) {
      fetchNoticeDetail();
    }
  }, [nnum]);

  const handleDelete = async () => {
    if (window.confirm("이 공지사항을 삭제하시겠습니까?")) {
      try {
        await noticeApi.deleteNotice(nnum); // 공지사항 삭제 API 호출
        navigate("/admin/support/notice"); // 삭제 후 관리자 목록으로 이동
      } catch (err) {
        setError(err.message);
      }
    }
  };

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
          <div className="mt-4">
            <Link
              to={`/admin/support/notice/${nnum}/modify`} // 수정 링크 업데이트
              className="mr-4 inline-block text-blue-500"
            >
              수정하기
            </Link>
            <button
              onClick={handleDelete}
              className="inline-block text-red-500"
            >
              삭제하기
            </button>
            <button
              onClick={() => navigate("/admin/support/notice")}
              className="ml-4 inline-block text-blue-500"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      ) : (
        <p>공지사항을 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default AdminNoticeDetail;
