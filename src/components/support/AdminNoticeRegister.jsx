import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotice } from "../../api/support/noticeApi"; // 공지사항 등록 API

const AdminNoticeRegisterPage = () => {
  const navigate = useNavigate(); // 등록 후 페이지 이동
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // 공지사항 입력 상태
  const [notice, setNotice] = useState({
    ntitle: "", // 초기값 설정
    ncontent: "", // 초기값 설정
    regDate: formattedDate,
  });

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prevNotice) => ({
      ...prevNotice,
      [name]: value,
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    try {
      // JSON 형태로 공지사항 데이터 전송
      await createNotice(notice);
      alert("공지사항이 등록되었습니다.");
      navigate("/admin/support/notice"); // 등록 후 공지사항 목록 페이지로 이동
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  const handleListClick = () => {
    navigate("/admin/support/notice");
  };

  return (
    <div className="bg-gray-800 p-10 shadow-lg">
      <div className="mb-4 text-2xl font-extrabold text-white">
        공지사항 등록
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ntitle" className="text-gray-200">
            제목
          </label>
          <input
            type="text"
            id="ntitle"
            name="ntitle" // name을 ntitle로 설정
            value={notice.ntitle} // 초기값 설정
            onChange={handleChange}
            className="mt-2 w-full rounded-md p-2 text-black"
            placeholder="공지사항 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label htmlFor="ncontent" className="text-gray-200">
            내용
          </label>
          <textarea
            id="ncontent"
            name="ncontent" // name을 ncontent로 설정
            value={notice.ncontent} // 초기값 설정
            onChange={handleChange}
            className="mt-2 w-full rounded-md p-2 text-black"
            placeholder="공지사항 내용을 입력하세요"
            rows="5"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="mr-2 w-1/2 rounded-md bg-gray-500 p-3 text-white hover:bg-transparent"
          >
            등록
          </button>
          <button
            type="button"
            className="w-1/2 rounded-md bg-gray-500 p-3 text-white hover:bg-transparent"
            onClick={handleListClick}
          >
            목록
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNoticeRegisterPage;
