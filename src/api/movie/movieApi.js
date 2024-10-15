import axios from "axios";

// API 기본 URL
const API_URL = "http://localhost:8080/api/admin/movie";

// ID로 특정 영화를 가져오는 함수 -> 영화 상세정보 조회
export const fetchMovieById = async (movieNum) => {
  try {
    const response = await axios.get(`${API_URL}/${movieNum}`);
    return response.data; // API에서 반환된 영화 데이터
  } catch (error) {
    console.error(
      `ID ${movieNum}에 대한 영화를 가져오는 데 오류가 발생했습니다:`,
      error,
    );
    throw error; // 오류를 다시 던져서 처리할 수 있게 합니다.
  }
};

// 모든 영화 목록을 가져오는 함수 -> 영화 목록 조회
export const fetchMovies = async (page = 1, size = 10) => {
  try {
    // page와 size를 쿼리 파라미터로 추가
    const response = await axios.get(`${API_URL}/list`, {
      params: {
        page: page,
        size: size,
      },
    });

    return response.data; // API에서 반환된 영화 데이터
  } catch (error) {
    console.error("영화 목록을 가져오는 데 오류가 발생했습니다:", error);
    throw error; // 오류를 다시 던져서 처리할 수 있게 합니다.
  }
};
