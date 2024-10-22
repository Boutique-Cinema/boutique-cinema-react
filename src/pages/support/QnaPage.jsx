import React, { useState, useEffect } from "react";
import { getQuestionList } from "../../api/qnaApi";
import { useNavigate } from "react-router-dom";

const QnaPage = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // 페이지 번호 함수
  const pageSequence = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => {
      const startPage = Math.floor((page - 1) / 5) * 5 + 1;
      return startPage + index;
    },
  ).filter((p) => p <= totalPages);

  // API 호출
  useEffect(() => {
    const questionList = async () => {
      try {
        const data = await getQuestionList(page, 10);
        setQuestions(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("질문 목록을 가져오는 중 에러 발생:", error);
      }
    };

    questionList();
  }, [page]);

  console.log(questions);

  return (
    <>
      <div className="mb-4 ml-10 text-3xl font-extrabold">1:1 문의</div>
      <div className="mx-auto ml-7 flex max-w-[100%]">
        <div className="w-full p-4 text-white">
          <div className="mt-2 overflow-auto border border-gray-500">
            <table className="w-full border-collapse border border-gray-500 text-center">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="w-1/12 border border-gray-500 px-4 py-3 text-base">
                    번호
                  </th>
                  <th className="w-1/3 border border-gray-500 px-4 py-3 text-base">
                    제목
                  </th>
                  <th className="w-1/6 border border-gray-500 px-4 py-3 text-base">
                    작성일
                  </th>
                  <th className="w-1/6 border border-gray-500 px-4 py-3 text-base">
                    답변상태
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {questions.map((question, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-700"
                    onClick={() =>
                      navigate(`/support/qna/detail/${question.qnum}`)
                    }
                  >
                    <td className="border border-gray-500 px-4 py-3">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="border border-gray-500 px-4 py-3">
                      {question.qtitle}
                    </td>
                    <td className="border border-gray-500 px-4 py-3">
                      {question.qdate}
                    </td>
                    <td className="border border-gray-500 px-4 py-3">
                      {question.qstatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 페이지네이션 */}
          <div className="flex justify-center">
            <div className="mb-16 mt-10 flex items-center justify-center">
              <button
                className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
                onClick={() => setPage(1)}
                disabled={page === 1}
              >
                &lt;&lt;
              </button>
              <button
                className="mx-1 whitespace-nowrap rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                이전
              </button>
              {pageSequence.map((p) => (
                <button
                  key={p}
                  className={`mx-1 rounded border border-gray-500 px-2 py-1 text-white ${p === page ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="mx-1 whitespace-nowrap rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                다음
              </button>
              <button
                className="mx-1 rounded border border-gray-500 bg-gray-700 px-2 py-1 text-white hover:bg-gray-600"
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
          <div className="relative w-full">
            <button
              className="absolute bottom-14 right-0 rounded bg-secondary p-3 hover:bg-secondary-hover"
              type="button"
              onClick={() => navigate(`/support/qna/register`)}
            >
              문의 작성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QnaPage;
