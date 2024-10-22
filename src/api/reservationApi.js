import axios from "axios";

// API 기본 URL
const API_URL = "http://localhost:8080/api/reservation";

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(API_URL, reservationData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("예매를 생성하는데 오류가 발생했습니다.", error);
    throw error;
  }
};

// 예매 목록 가져오기 함수
export const getAllReservations = async (mId) => {
  try {
    const response = await axios.get(`${API_URL}/member/${mId}`);
    return response.data; // 응답 구조에 따라 적절히 수정할 수 있습니다.
  } catch (error) {
    console.error("예매 목록을 가져오는 중 오류가 발생했습니다.", error);
    throw error;
  }
};
