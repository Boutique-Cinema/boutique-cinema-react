import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/member`;

export const postAdd = async (form) => {
  const res = await axios.post(`${prefix}/joinpage`, form);
  return res.data;
};

export const checkId = async (id) => {
  try {
    const response = await axios.get(`${prefix}/check-id`, {
      params: { id: id },
    });
    return response.data; // 사용 가능한 아이디인지 여부 반환
  } catch (error) {
    console.error("아이디 중복 체크 오류:", error);
    throw error; // 오류를 호출한 곳으로 전달
  }
};
