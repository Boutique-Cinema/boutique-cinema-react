import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080"; // 백엔드 주소, 서버 주소 설정

const MOVIE_API_PREFIX = `${API_SERVER_HOST}/api/admin/movie`; //영화 엔드포인트 설정, 영화 백엔드 API주소

export const getMovie = async (movieNum) => {
  // 영화 상세 조회 처리
  const res = await axios.get(`${MOVIE_API_PREFIX}/${movieNum}`);

  return res.data;
};

export const getMovieList = async (page, size, searchCondition) => {
  try {
    let url = `${MOVIE_API_PREFIX}/list`;

    //조건에 따라 URL 수정
    if (searchCondition) {
      url = `${MOVIE_API_PREFIX}/list?page=${page}&size=${size}&searchCondition=${searchCondition}`;
    }
    const response = await axios.get(url); // API 호출

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // 에러 처리
  }
};

// 영화 등록
export const registerMovie = async (movieData) => {
  const res = await jwtAxios.post(`${MOVIE_API_PREFIX}`, movieData, {
    headers: {
      "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
    },
  });
  return res.data; // 등록된 영화 정보 반환
};

// 영화 수정
export const modifyMovie = async (movieNum, movieData) => {
  const res = await jwtAxios.put(`${MOVIE_API_PREFIX}/${movieNum}`, movieData, {
    headers: {
      "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
    },
  });
  return res.data; // 수정된 영화 정보 반환 (필요한 경우)
};

// 영화 삭제
export const removeMovie = async (movieNum) => {
  await jwtAxios.delete(`${MOVIE_API_PREFIX}/${movieNum}`);
  return; // 삭제 후 특별한 반환값이 필요 없는 경우
};

// 영화 정렬 기능
export const fetchSortedMovies = async (page, size, sortOrder) => {
  try {
    let url = `${MOVIE_API_PREFIX}/list?page=${page}&size=${size}`;

    // 정렬 조건에 따라 URL 수정
    if (sortOrder === "최신 순") {
      url = `${MOVIE_API_PREFIX}/list/latest?page=${page}&size=${size}`;
    } else if (sortOrder === "오래된 순") {
      url = `${MOVIE_API_PREFIX}/list/earliest?page=${page}&size=${size}`;
    }
    const response = await axios.get(url); // API 호출

    return response.data; // API로부터 받은 데이터 반환
  } catch (error) {
    console.error("Error fetching sorted movies:", error);
    throw error; // 에러 처리
  }
};

// 날짜별 영화 목록 조회
export const fetchMoviesByDate = async (date) => {
  try {
    // 서버에서 영화 리스트를 받아오는 axios 요청
    const response = await axios.get(
      `${MOVIE_API_PREFIX}/list/date?date=${date}`,
    );
    return response.data;
  } catch (error) {
    console.error("영화 목록을 가져오는 데 오류가 발생했습니다:", error);
    throw error;
  }
};
