import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NoticeDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        // 실제 API 호출 대신 가상의 데이터 사용
        const fakeNotices = [
          {
            id: 1,
            title:
              "[카카오뱅크] 본인인증 시스템 정기점검에 따른 이용 안내(10/06)",
            date: "2024-09-26T00:00:00Z",
            content: `안녕하세요, 메가박스 입니다.
              10월06일(일) 카카오뱅크 본인 인증 서비스 정기점검 작업이 진행될 예정입니다.
              서비스 이용에 불편이 없도록 사전에 아래 내용을 참고해 주시기 바랍니다.
              <시스템 점검 시간 및 내용>
              - 작업일시: 2024년 10월 06일(일) 01:00 ~ 08:00 (7시간)
              - 중단 업무 : 카카오뱅크 본인 인증 서비스
              해당시간 다른 인증서비스 이용 부탁 드립니다.
              더욱 안정되고 원활한 서비스로 찾아 뵙겠습니다.
              감사합니다.`,
          },
          {
            id: 2,
            title: "[서면대한] 신규오픈안내",
            date: "2024-09-25T00:00:00Z",
            content: "상세 내용이 여기에 들어갑니다.",
          },
          // 추가 가상의 공지사항 데이터...
        ];

        // ID에 해당하는 공지사항 찾기
        const noticeData = fakeNotices.find(
          (notice) => notice.id === parseInt(id),
        );
        if (noticeData) {
          setNotice(noticeData);
        } else {
          setError("공지사항을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError(err.message);
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
