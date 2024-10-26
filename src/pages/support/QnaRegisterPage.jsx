import React, { useState } from "react";
import { registerQuestion } from "../../api/qnaApi";
import { useNavigate } from "react-router-dom";

const QnaRegisterPage = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`; // 날짜 형식

  // 질문 등록에 필요한 상태 초기화
  const [questions, setQuestions] = useState({
    mId: "",
    qTitle: "",
    qContent: "",
    qStatus: "답변대기",
    qDate: formattedDate,
  });

  const navigate = useNavigate(); // 등록 처리 후 페이지 이동

  // 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions({
      ...questions,
      [name]: value,
    }); // 상태 업데이트
  };

  // 질문 등록 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const formData = new FormData();

    // 질문 데이터를 FormData에 추가
    for (const key in questions) {
      formData.append(key, questions[key]);
    }

    try {
      await registerQuestion(formData); // 영화 등록 API 호출
      alert("등록이 완료되었습니다."); // 알림 추가
      navigate("/support/qna"); // 등록 완료 후 이동
    } catch (error) {
      console.error("질문 등록 실패:", error);
    }
  };

  return (
    <>
      <h2 className="ml-10 text-2xl font-medium">1:1 문의 등록</h2>
      <div className="ml-7 w-full p-4 text-lg text-white">
        · 환불은 마이페이지 예매내역의 환불신청 버튼을 이용해주세요.
        <br />· 영화 티켓은 환불규정에 의거하여 관람시간이 지나면 취소/환불이
        불가합니다
      </div>
      <div className="mx-auto ml-7 flex max-w-[100%]">
        <div className="w-full p-4 text-white">
          <div className="mt-2">
            <div className="flex items-center">
              <div className="mb-1 w-[10%] text-xl font-bold text-gray-200">
                아이디
              </div>
              <input
                className="block w-[100%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
                type="text"
                placeholder="아이디를 입력해주세요"
                name="mId"
                value={questions.mId}
                maxLength={20}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 flex w-full items-center">
            <div className="mb-1 w-[11%] text-xl font-bold text-gray-200">
              제목
            </div>
            <input
              className="block w-[100%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
              type="text"
              placeholder="제목을 입력해주세요"
              name="qTitle"
              value={questions.qTitle}
              maxLength={50}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="ml-10 mt-4 flex items-center">
        <div className="mb-1 w-[10%] text-xl font-bold text-gray-200">내용</div>
        <textarea
          className="block h-72 w-[89%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
          type="text"
          placeholder="문의 내용을 입력해주세요"
          name="qContent"
          value={questions.qContent}
          maxLength={3000}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex w-full justify-end">
        <button
          className="mr-2 rounded bg-secondary p-3 hover:bg-secondary-hover"
          type="button"
          onClick={handleSubmit}
        >
          문의 등록
        </button>
      </div>
    </>
  );
};

export default QnaRegisterPage;
