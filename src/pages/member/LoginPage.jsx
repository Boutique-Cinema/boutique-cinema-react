import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import { postLogin } from "../../api/membersApi";

export default function LoginPage() {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  // 입력값이 변경될 때마다 form 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, // name 속성에 따라 id 또는 password 업데이트
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = { ...form };
    try {
      const response = await postLogin(dataToSubmit); // 비동기 요청으로 수정
      console.log("서버 응답:", response); // 응답 로그 추가

      if (response && response.id) {
        alert("로그인에 성공했습니다!");
        window.location.href = "/";
      } else {
        alert("아이디 비밀번호를 확인해주세요!");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      setErrorMessage("서버와의 연결에 문제가 발생했습니다."); // 네트워크 오류 처리
    }
  };

  // 숫자만 입력
  const onKeyUpHandler = (e) => {
    const { name } = e.target;

    if (name === "id") {
      const englishValue = e.target.value.replace(/[^a-z,1-9]/g, ""); // 한글만 작성가능
      setForm((prev) => ({
        ...prev,
        id: englishValue,
      }));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <a href="/">
          <Logo />
        </a>
        <form
          onSubmit={handleSubmit}
          className="w-[330px] rounded-lg bg-white p-5 shadow-md"
        >
          <div className="overflow-hidden border-gray-300"></div>
          <h2 className="mb-2 text-lg font-medium text-black">로그인</h2>
          <div className="overflow-hidden rounded border border-gray-300">
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              onKeyUp={onKeyUpHandler}
              placeholder="아이디"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          <div className="mb-4 mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="password" // 비밀번호 필드는 password 타입으로
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {/* 에러 메시지 표시 */}
          {errorMessage && (
            <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer rounded border-none bg-gray-700 p-2 text-white"
          >
            로그인
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            <a href="/">아이디 찾기</a> |<a href="/"> 비밀번호 찾기</a> |
            <a href="/member/join"> 회원가입</a>
          </div>
        </form>
      </div>
    </div>
  );
}
