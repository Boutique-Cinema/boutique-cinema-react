import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postLogin } from "../api/membersApi";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  id: "",
};

const loadMemberCookie = () => {
  // 쿠키에서 로그인 정보 로딩
  const memberInfo = getCookie("member");
  // 이름 처리
  if (memberInfo && memberInfo.name) {
    memberInfo.name = decodeURIComponent(memberInfo.name);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return postLogin(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: loadMemberCookie() || initState, // 쿠키가 없으면 초기값 사용
  reducers: {
    login: (state, action) => {
      //{id, password로 구성}
      const data = action.payload;

      //새로운 상태
      return { id: data.id };
    },
    logout: (state, action) => {
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        // 정상적인 로그인시에만 저장
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1); // 1일
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {})
      .addCase(loginPostAsync.rejected, (state, action) => {});
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
