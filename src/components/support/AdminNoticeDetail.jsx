import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getNotice, deleteNotice } from "../../api/noticeApi";

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
      const data = await getNotice(nnum);
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
        await deleteNotice(nnum); // 공지사항 삭제 API 호출
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
    <>
      <div className="h-4/5 overflow-y-auto rounded-lg bg-gray-100 p-6 shadow-lg">
        <div>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            {notice.ntitle}
          </h1>
          <p className="mb-2 text-sm text-gray-400">
            {formatDate(notice.ndate)}
          </p>
          <div className="h-4/5 overflow-y-auto border-t border-gray-200 pt-4 text-lg leading-relaxed text-gray-700">
            {notice.ncontent}
          </div>
        </div>
      </div>
      {/* 버튼들이 콘텐츠와 분리되어 border 바로 아래에 위치 */}
      <div className="mt-6 flex items-center pt-4">
        <Link
          to={`/admin/support/notice/${nnum}/modify`} // 수정 링크 업데이트
          className="mr-4 rounded-md bg-zinc-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          수정하기
        </Link>
        <button
          onClick={handleDelete}
          className="mr-4 rounded-md bg-red-900 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600"
        >
          삭제하기
        </button>
        <button
          onClick={() => navigate("/admin/support/notice")}
          className="ml-auto rounded-md bg-gray-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
        >
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default AdminNoticeDetail;
