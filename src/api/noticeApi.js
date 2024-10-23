import axios from "axios";

// 공지사항 API URL
const API_URL = "http://localhost:8080";
const NOTICE_API_PREFIX = `${API_URL}/api/admin/notices`; // 영화 엔드포인트 설정, 영화 백엔드 API주소

// 공지사항 전체 목록 가져오기 (페이지네이션 추가)
export const getNoticeList = async (page = 1, size = 10) => {
  try {
    console.log(
      `페이지: ${page}, 크기: ${size} - 공지사항 목록을 가져오는 중...`,
    );
    const url = `${NOTICE_API_PREFIX}/list/latest?page=${page}&size=${size}`;
    const response = await axios.get(url);
    console.log("공지사항 목록 가져오기 성공:", response.data); // 응답 데이터 확인
    return response.data || { content: [], totalPages: 1 }; // 응답 데이터가 없을 경우 기본값 반환
  } catch (error) {
    console.error(
      "공지사항 목록 가져오기 실패:",
      error.response ? error.response.data : error.message,
    );
    throw new Error(error.response ? error.response.data : "API 호출 실패");
  }
};

// 공지사항 상세 조회
export const getNotice = async (nnum) => {
  console.log(`공지사항 번호: ${nnum} 상세 조회 중...`);
  const res = await axios.get(`${NOTICE_API_PREFIX}/${nnum}`);
  console.log("공지사항 상세 조회 성공:", res.data); // 응답 데이터 확인
  return res.data;
};

// 공지사항 등록
export const createNotice = async (noticeData) => {
  try {
    console.log("공지사항 등록 중...", noticeData); // 요청 데이터 확인
    const response = await axios.post(NOTICE_API_PREFIX, noticeData); // 수정된 부분
    console.log("공지사항 등록 성공:", response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error(
      "공지사항 등록 실패:",
      error.response ? error.response.data : error.message,
    );
    throw new Error(
      error.response ? error.response.data : "공지사항 등록 실패",
    );
  }
};

// 공지사항 수정
export const updateNotice = async (nnum, noticeData) => {
  console.log(`공지사항 번호: ${nnum} 수정 중...`, noticeData); // 수정 데이터 확인
  const response = await axios.put(`${NOTICE_API_PREFIX}/${nnum}`, noticeData); // 수정된 부분
  console.log("공지사항 수정 성공:", response.data); // 응답 데이터 확인
  return response.data;
};

// 공지사항 조회
export const readNotice = async (nnum) => {
  console.log(`공지사항 번호: ${nnum} 조회 중...`);
  const response = await axios.get(`${NOTICE_API_PREFIX}/${nnum}`);
  console.log("공지사항 조회 성공:", response.data); // 응답 데이터 확인
  return response.data;
};

// 공지사항 삭제
export const deleteNotice = async (nnum) => {
  console.log(`공지사항 번호: ${nnum} 삭제 중...`);
  await axios.delete(`${NOTICE_API_PREFIX}/${nnum}`);
  console.log("공지사항 삭제 성공:", nnum); // 삭제된 공지사항 번호 확인
};
