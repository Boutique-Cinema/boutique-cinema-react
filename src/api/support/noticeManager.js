import axios from "axios";

// 공지사항 API URL
const Api_Url = "http://localhost:8080/api/admin/notices";

const NoticeManager = {
  // 공지사항 목록 가져오기
  fetchNotices: async () => {
    try {
      const response = await axios.get(Api_Url);
      return response.data; // API 응답의 데이터를 반환
    } catch (error) {
      throw new Error(error.response ? error.response.data : "API 호출 실패");
    }
  },

  // 공지사항 등록
  createNotice: async (noticeData) => {
    try {
      const response = await axios.post(Api_Url, noticeData);
      return response.data; // 등록된 공지사항 ID반환
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "공지사항 등록 실패",
      );
    }
  },

  // 공지사항 조회
  updateNotice: async (nNum) => {
    try {
      const response = await axios.get(`${Api_Url}/${nNum}`);
      return response.data; //API 응답의 데이터를 반환
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "공지사항 조회 실패",
      );
    }
  },

  // 공지사항 삭제
  deleteNotice: async (nNum) => {
    try {
      await axios.delete(`${Api_Url}/${nNum}`);
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "공지사항 삭제 실패",
      );
    }
  },
};

export default NoticeManager;
