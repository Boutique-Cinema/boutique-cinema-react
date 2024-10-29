import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../../components/common/Logo";
import { postLogin } from "../../api/membersApi";
import { loginPostAsync } from "../../slice/loginSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initState = {
    id: "",
    password: "",
    roleNames: "",
  };

  const [loginParam, setLoginParam] = useState(initState);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  // 입력값이 변경될 때마다 loginParam 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginParam((prev) => ({
      ...prev,
      [name]: value, // name 속성에 따라 id 또는 password 업데이트
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin(loginParam); // 비동기 요청으로 수정

      if (response && response.id) {
        // 로그인 요청을 비동기적으로 처리
        await dispatch(loginPostAsync(loginParam)).unwrap();
        navigate("/");
      } else {
        alert("아이디 비밀번호를 확인해주세요!");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      setErrorMessage("서버와의 연결에 문제가 발생했습니다."); // 네트워크 오류 처리
    }
  };

  //

  // 숫자만 입력
  const onKeyUpHandler = (e) => {
    const { name } = e.target;

    if (name === "id") {
      const englishValue = e.target.value.replace(/[^a-z,0-9]/g, ""); // 영어 및 숫자만 입력
      setLoginParam((prev) => ({
        ...prev,
        id: englishValue,
      }));
    }
  };

  return (
    <div className="mx-auto mt-40 flex w-full max-w-md flex-col items-center justify-center rounded-md bg-white p-6 shadow-md">
      <div className="w-full">
        <a
          href="/"
          className="flex items-center justify-center rounded-lg bg-primary"
        >
          <Logo />
        </a>
        <form onSubmit={handleSubmit}>
          <h2 className="mt-6 text-left text-lg font-medium text-black">
            로그인
          </h2>
          <div className="mt-2 flex items-center rounded-md border p-2">
            <input
              type="text"
              name="id"
              value={loginParam.id}
              onChange={handleChange}
              onKeyUp={onKeyUpHandler}
              placeholder="아이디"
              maxLength={20}
              className="w-full bg-transparent text-black outline-none"
            />
          </div>
          <div className="mb-4 mt-4 flex items-center rounded-md border p-2">
            <input
              type="password"
              name="password"
              value={loginParam.password}
              onChange={handleChange}
              placeholder="비밀번호"
              maxLength={20}
              className="w-full bg-transparent text-black outline-none"
            />
          </div>
          {errorMessage && (
            <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-gray-700 py-2 text-white"
          >
            로그인
          </button>
          <div className="mt-4 text-center text-sm text-gray-500">
            <a href="/member/find_info">아이디 찾기</a> |{" "}
            <a href="/member/find_info">비밀번호 찾기</a> |{" "}
            <a href="/member/join">회원가입</a>
          </div>
        </form>
      </div>
    </div>
  );
}
