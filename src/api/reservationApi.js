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
