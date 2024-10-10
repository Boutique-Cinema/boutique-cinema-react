import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:3000";

const prefix = `${API_SERVER_HOST}/member/JoinPage`;

export const postAdd = async (form) => {
  const res = await axios.post(prefix, form);
  return res.data;
};
