import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { updateNotice, readNotice } from "../../../api/noticeApi";

const AdminNoticeModifyPage = () => {
  const { nnum } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ntitle: "",
    ncontent: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNoticeDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await readNotice(nnum); // 공지사항 조회
      setFormData({ ntitle: data.ntitle, ncontent: data.ncontent });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [nnum]);

  useEffect(() => {
    fetchNoticeDetail(); // 공지사항 상세 조회
  }, [fetchNoticeDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateNotice(nnum, formData); // 수정 API 호출
      navigate(`/admin/support/notice/${nnum}`); // 수정 후 상세 페이지로 이동
    } catch (err) {
      console.error("수정 실패:", err.message); // 에러 시 로그
      setError(err.message);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">공지사항 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-black">
          <label className="mb-1 block" htmlFor="ntitle">
            제목
          </label>
          <input
            type="text"
            id="ntitle"
            name="ntitle"
            value={formData.ntitle}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-4 text-black">
          <label className="mb-1 block" htmlFor="ncontent">
            내용
          </label>
          <textarea
            id="ncontent"
            name="ncontent"
            value={formData.ncontent}
            onChange={handleChange}
            className="w-full rounded border p-2"
            rows="10"
            required
          />
        </div>
        <button
          type="submit"
          className="mr-4 rounded-md bg-zinc-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          수정하기
        </button>
        <Link
          to={`/admin/support/notice/${nnum}`}
          className="inline-block text-white"
        >
          <button className="mr-4 rounded-md bg-red-900 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600">
            취소
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AdminNoticeModifyPage;
