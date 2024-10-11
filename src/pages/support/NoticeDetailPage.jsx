import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoticeManager from "../../api/support/noticeManager";

const NoticeDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true); // 로딩 상태 초기화
      try {
        // API호출로 ID에 해당하는 공지사항 찾기
        const noticeData = await NoticeManager.updateNotice(id);
        setNotice(noticeData);
      } catch (err) {
        setError(err.message || "공지사항을 가져오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="mb-4 ml-10 mt-16 text-2xl">공지사항</div>
      <section className="ml-10 mr-10 mt-10 border-b border-t">
        <h1 className="mt-3 text-2xl font-bold">{notice.title}</h1>
        <div className="flex">
          <p className="mb-2 ml-2 mr-2 mt-2">등록일</p>
          <p className="m-2">{new Date(notice.date).toLocaleDateString()}</p>
        </div>
      </section>
      <div className="mb-16 ml-10 mr-10 mt-16 h-[430px] border-b pb-20 text-gray-50">
        {notice.content}
      </div>

      {/* 버튼을 화면 가운데에 배치하고 스타일을 추가 */}
      <div className="mb-10 flex justify-center">
        <Link to="/support/notice" className="inline-block text-gray-100">
          <button className="rounded-lg border bg-gray-400 p-3 text-white transition duration-300 ease-in-out hover:bg-gray-600">
            목록
          </button>
        </Link>
      </div>
    </>
  );
};

export default NoticeDetailPage;
