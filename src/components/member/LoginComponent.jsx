// 로그인 페이지
import Logo from "../common/Logo";
import { useState } from "react";

function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validate() === true) {
    //   const { passwordConfirm, allCheck, ...dataToSubmit } = form; // passwordConfirm과 allCheck 제외
    //   postAdd(dataToSubmit); // JSON 형식으로 서버에 보냄

    //   console.log("Form submitted:", form);
    //   alert("회원가입이 완료됐습니다.");
    //   // window.location.href = "/";

    // }
  };
  const [form, setForm] = useState({
    id: "",
    password: "",
  });
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
              placeholder="아이디"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          <div className="mb-4 mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="text"
              name="id"
              value={form.password}
              placeholder="비밀번호"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
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

export default LoginPage;
