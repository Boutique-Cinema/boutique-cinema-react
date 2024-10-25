import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080"; // 백엔드 주소, 서버 주소 설정

const QUESTION_API_PREFIX = `${API_SERVER_HOST}/api/question`; // 사용자 1대1문의 질문 엔드포인트 설정, 백엔드 API주소

// 사용자 1대1문의 질문 상세 조회
export const getQuestion = async (qNum) => {
  const res = await jwtAxios.get(`${QUESTION_API_PREFIX}/${qNum}`);

  return res.data;
};

// 사용자 1대1문의 질문 리스트 조회
export const getQuestionList = async (page, size) => {
  const res = await jwtAxios.get(`${QUESTION_API_PREFIX}/list`, {
    params: {
      size: size,
      page: page,
    },
  }); // API 호출

  return res.data; // 응답 데이터 반환
};

//사용자 1대1문의 질문 등록
export const registerQuestion = async (questionData) => {
  const res = await jwtAxios.post(`${QUESTION_API_PREFIX}`, questionData);

  return res.data;
};

//사용자 1대1문의 질문 수정
export const modifyQuestion = async (qNum, questionData) => {
  const res = await jwtAxios.put(
    `${QUESTION_API_PREFIX}/${qNum}`,
    questionData,
  );

  return res.data; // 수정된 영화 정보 반환
};

//사용자 1대1문의 질문 삭제
export const removeQuestion = async (qNum) => {
  jwtAxios.delete(`${QUESTION_API_PREFIX}/${qNum}`);

  return;
};
