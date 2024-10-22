import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modifyQuestion, removeQuestion, getQuestion } from "../../api/qnaApi";

const QnaDetailPage = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const { qNum } = useParams();

  const navigate = useNavigate(); // 페이지 이동

  // 질문 수정에 필요한 상태 초기화
  const [questions, setQuestions] = useState({
    mid: "",
    qtitle: "",
    qcontent: "",
    qstatus: "",
    qdate: formattedDate,
  });

  // 질문 데이터 가져오기
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const questionData = await getQuestion(qNum); // 영화 데이터 가져오기
        console.log(questionData);
        setQuestions({
          ...questions,
          ...questionData, // 질문 데이터로 상태 업데이트
        });
      } catch (error) {
        console.error("질문 데이터 가져오기 실패:", error);
      }
    };
    fetchQuestion(); // 질문 데이터 호출
  }, [qNum]); // qNum이 변경될 때마다 호출

  // 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [name]: value,
    })); // 상태 업데이트
  };

  // 질문 목록으로
  const handleList = async (e) => {
    navigate("/support/qna");
  };

  // 질문 수정 제출 처리 함수
  const handleModify = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const formData = new FormData();

    // 질문 데이터를 추가
    // { qTitle을 qtitle로 인식해서 가져오기때문에 직접 입력하는 객체명을 설정함 }
    formData.append("qContent", questions.qcontent);
    formData.append("mId", questions.mid);
    formData.append("qTitle", questions.qtitle);
    formData.append("qStatus", questions.qstatus);
    formData.append("qDate", questions.qdate);
    formData.append("qNum", qNum);

    console.log([...formData]);
    console.log(questions);
    try {
      const response = await modifyQuestion(qNum, formData); // 영화 등록 API 호출
      console.log("질문 수정 성공:", response);
      alert("수정이 완료되었습니다."); // 알림 추가
      navigate("/support/qna"); // 등록 완료 후 이동
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  // 영화 삭제 처리 함수
  const handleRemove = async () => {
    const confirmRemove = window.confirm("정말로 이 영화를 삭제하시겠습니까?");
    if (!confirmRemove) return;

    try {
      await removeQuestion(qNum); // 영화 삭제 API 호출
      alert("질문이 삭제되었습니다."); // 알림 추가
      navigate("/support/qna"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error("질문 삭제 실패:", error);
      alert("질문 삭제에 실패했습니다."); // 에러 알림
    }
  };

  return (
    <>
      <div className="mb-4 ml-10 text-3xl font-extrabold">1:1 문의</div>
      <div className="mx-auto ml-7 flex max-w-[100%]">
        <div className="w-full p-4 text-white">
          <div className="mt-2"></div>
          <div className="mt-4 flex w-full items-center">
            <div className="mb-1 w-[11%] text-xl font-bold text-gray-200">
              제목
            </div>
            <input
              className="block w-[100%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
              type="text"
              placeholder="제목을 입력해주세요"
              name="qtitle"
              value={questions.qtitle}
              maxLength={50}
              onChange={handleChange}
              readOnly={questions.qstatus === "답변완료"}
            />
          </div>
        </div>
      </div>
      <div className="ml-10 flex items-center">
        <div className="mb-1 w-[10%] text-xl font-bold text-gray-200">
          아이디
        </div>
        <input
          className="block w-[34%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
          type="text"
          placeholder="아이디를 입력해주세요"
          name="mid"
          value={questions.mid}
          maxLength={20}
          onChange={handleChange}
          readOnly={questions.qstatus === "답변완료"}
        />
        <div className="mb-1 ml-4 w-[8%] text-xl font-bold text-gray-200">
          작성일
        </div>
        <input
          className="block w-[34%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
          type="text"
          name="qdate"
          value={questions.qdate}
          readOnly
        />
        <div
          className="ml-3 rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
          name="qstatus"
        >
          {questions.qstatus}
        </div>
      </div>
      <div className="ml-10 mt-4 flex items-center">
        <div className="mb-1 w-[10%] text-xl font-bold text-gray-200">내용</div>
        <textarea
          className="block h-72 w-[89%] rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black"
          name="qcontent"
          value={questions.qcontent}
          maxLength={3000}
          onChange={handleChange}
          readOnly={questions.qstatus === "답변완료"}
        />
      </div>
      <div className="mt-4 flex w-full justify-end">
        <div className="mt-4 flex w-full justify-end">
          <button
            className="mr-2 rounded bg-gray-400 p-3 hover:bg-gray-500"
            type="button"
            onClick={handleList}
          >
            목록
          </button>
          {questions.qstatus !== "답변완료" && (
            <>
              <button
                className="mr-2 rounded bg-gray-400 p-3 hover:bg-gray-500"
                type="button"
                onClick={handleModify}
              >
                수정
              </button>
              <button
                className="mr-2 rounded bg-secondary p-3 hover:bg-secondary-hover"
                type="button"
                onClick={handleRemove}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QnaDetailPage;
