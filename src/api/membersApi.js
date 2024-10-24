import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/member`;

// 회원가입
export const postAdd = async (form) => {
  const res = await axios.post(`${prefix}/joinpage`, form);
  return res.data;
};

// 회원 목록 가져오기
export const getAllMembers = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(
      `${prefix}/list?page=${page}&size=${size}`,
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("회원 목록 가져오기 오류:", error);
    throw error; // 오류를 호출한 곳으로 전달
  }
};

export const postLogin = async (form) => {
  try {
    console.log("로그인 요청 데이터:", form); // 서버로 보내는 데이터 로그
    // FormData 객체 생성
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    const response = await axios.post(`${prefix}/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findId = async (form) => {
  try {
    console.log("아이디 찾기 요청 데이터 : ", form);
    const response = await axios.post(`${prefix}/findId`, form);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error;
  }
};

export const checkMember = async (form) => {
  try {
    console.log("회원 확인 요청 데이터 : ", form);
    const response = await axios.post(`${prefix}/check-member`, form);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (id, password) => {
  try {
    const response = await axios.post(`${prefix}/reset-password`, {
      id,
      password,
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("비밀번호 재설정 오류: ", error);
    throw error;
  }
};

//아이디 중복 체크
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
