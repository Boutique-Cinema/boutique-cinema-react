import jwtAxios from "../util/jwtUtil";

// API 기본 URL
const API_URL = "http://localhost:8080/api/reservation";

export const createReservation = async (reservationData) => {
  try {
    const response = await jwtAxios.post(API_URL, reservationData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("예매를 생성하는데 오류가 발생했습니다.", error);
  }
};

export const getAllReservations = async () => {
  try {
    const response = await jwtAxios.get(`${API_URL}/list`);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("예매 목록을 불러오는데 오류가 발생했습니다.", error);
  }
};

export const getReservationsById = async (mid) => {
  try {
    const response = await jwtAxios.get(`${API_URL}/member/${mid}`);

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("예매 목록을 불러오는데 오류가 발생했습니다.", error);
  }
};

export const getReservationByRnum = async (rnum) => {
  try {
    const response = await jwtAxios.get(`${API_URL}/${rnum}`);

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("예매를 불러오는데 오류가 발생했습니다.", error);
  }
};

export const deleteReservationByRnum = async (rnum) => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/${rnum}`);

    return response.data;
  } catch (error) {
    console.error("예매를 삭제하는데 실패했습니다.", error);
  }
};

export const cancelReservation = async (rnum) => {
  try {
    const response = await jwtAxios.put(`${API_URL}/cancel/${rnum}`);

    return response.data;
  } catch (error) {
    console.error("예매 취소에 실패했습니다.", error);
  }
};

export const updateReview = async (rnum, reviewData) => {
  try {
    const response = await jwtAxios.put(
      `${API_URL}/review/${rnum}`,
      reviewData,
    );

    return response.data;
  } catch (error) {
    console.error("리뷰 업데이트에 실패했습니다.", error);
  }
};
