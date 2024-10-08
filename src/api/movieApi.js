import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080"; // 백엔드 주소, 서버 주소 설정

const MOVIE_API_PREFIX = `${API_SERVER_HOST}/api/admin/movie`; //영화 엔드포인트 설정, 영화 백엔드 API주소

export const getMovie = async (movieNum) => {
  // 영화 상세 조회 처리
  const res = await axios.get(`${MOVIE_API_PREFIX}/${movieNum}`);

  return res.data;
};

export const getMovieList = async (pageParam) => {
  // 영화 리스트 페이지 처리
  const { page, size } = pageParam;
  const res = await axios.get(`${MOVIE_API_PREFIX}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// 영화 등록
export const registerMovie = async (movieData) => {
  const res = await axios.post(`${MOVIE_API_PREFIX}/`, movieData, {
    headers: {
      "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
    },
  });
  return res.data; // 등록된 영화 정보 반환
};

// 영화 수정
export const modifyMovie = async (movieNum, movieData) => {
  const res = await axios.put(`${MOVIE_API_PREFIX}/${movieNum}`, movieData, {
    headers: {
      "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
    },
  });
  return res.data; // 수정된 영화 정보 반환 (필요한 경우)
};

// 영화 삭제
export const removeMovie = async (movieNum) => {
  await axios.delete(`${MOVIE_API_PREFIX}/${movieNum}`);
  return; // 삭제 후 특별한 반환값이 필요 없는 경우
};
