import axios from "axios";

// 공지사항 API URL
const Api_Url = "http://localhost:8080/api/admin/notices";

const NoticeManager = {
  // 공지사항 전체 목록 가져오기 (페이지네이션 추가)
  fetchNotices: async (page = 1, size = 10) => {
    try {
      console.log("공지사항 목록을 가져오는 중..."); // 요청 전 로그
      const response = await axios.get(Api_Url, {
        params: { page, size }, // 페이지와 크기를 요청 파라미터로 전달
      });
      console.log("공지사항 목록 가져오기 성공:", response.data); // 응답 후 로그
      return response.data; // API 응답의 데이터를 반환
    } catch (error) {
      console.error(
        "공지사항 목록 가져오기 실패:",
        error.response ? error.response.data : error.message,
      ); // 에러 로그
      throw new Error(error.response ? error.response.data : "API 호출 실패");
    }
  },

  // 공지사항 등록
  createNotice: async (noticeData) => {
    try {
      console.log("공지사항 등록 중...", noticeData); // 요청 전 로그
      const response = await axios.post(Api_Url, noticeData);
      console.log("공지사항 등록 성공:", response.data); // 응답 후 로그
      return response.data; // 등록된 공지사항 ID 반환
    } catch (error) {
      console.error(
        "공지사항 등록 실패:",
        error.response ? error.response.data : error.message,
      ); // 에러 로그
      throw new Error(
        error.response ? error.response.data : "공지사항 등록 실패",
      );
    }
  },

  // 공지사항 수정
  updateNotice: async (nnum, noticeData) => {
    try {
      console.log(`공지사항 수정 중... ID: ${nnum}`, noticeData); // 요청 전 로그
      const response = await axios.put(`${Api_Url}/${nnum}`, noticeData);
      console.log("공지사항 수정 성공:", response.data); // 응답 후 로그
      return response.data; // 수정된 공지사항 데이터 반환
    } catch (error) {
      console.error(
        `공지사항 수정 실패 (ID: ${nnum}):`,
        error.response ? error.response.data : error.message,
      ); // 에러 로그
      throw new Error(
        error.response ? error.response.data : "공지사항 수정 실패",
      );
    }
  },
  // 공지사항 조회
  readNotice: async (nnum) => {
    try {
      console.log(`공지사항 조회 중... ID: ${nnum}`); // 요청 전 로그
      const response = await axios.get(`${Api_Url}/${nnum}`);
      console.log("공지사항 조회 성공:", response.data); // 응답 후 로그
      return response.data; // API 응답의 데이터를 반환
    } catch (error) {
      console.error(
        `공지사항 조회 실패 (ID: ${nnum}):`,
        error.response ? error.response.data : error.message,
      ); // 에러 로그
      throw new Error(
        error.response ? error.response.data : "공지사항 조회 실패",
      );
    }
  },

  // 공지사항 삭제
  deleteNotice: async (nnum) => {
    try {
      console.log(`공지사항 삭제 중... ID: ${nnum}`); // 요청 전 로그
      await axios.delete(`${Api_Url}/${nnum}`);
      console.log(`공지사항 삭제 성공: ID ${nnum}`); // 응답 후 로그
    } catch (error) {
      console.error(
        `공지사항 삭제 실패 (ID: ${nnum}):`,
        error.response ? error.response.data : error.message,
      ); // 에러 로그
      throw new Error(
        error.response ? error.response.data : "공지사항 삭제 실패",
      );
    }
  },
};

export default NoticeManager;
