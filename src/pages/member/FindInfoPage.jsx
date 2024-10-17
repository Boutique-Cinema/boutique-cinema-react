// 아이디 비밀번호 찾기 페이지
import { useState } from "react";

export default function FindInfoPage() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    id: "",
    password: "",
  });

  const [currentTab, setCurrentTab] = useState("id"); // 기본은 '아이디' 탭

  const handleTabClick = (tab) => {
    setCurrentTab(tab); // 탭을 클릭할 때 상태 변경
  };

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

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-md bg-white p-6 shadow-md">
        <div className="w-full">
          {/* 상단 탭 */}
          <div className="mb-6 flex border-b">
            <button className="w-1/2 border-b-2 border-black py-2 text-center font-bold text-black">
              아이디
            </button>
            <button className="w-1/2 py-2 text-center text-gray-400">
              비밀번호
            </button>
          </div>
          {/*페이지 헤더*/}
          {currentTab === "id" ? (
            <h2 className="mb-4 text-center text-lg text-black">
              가입한 회원 정보로
              <br />
              <span className="font-bold text-black">아이디</span>를 확인하세요.
            </h2>
          ) : (
            <h2 className="mb-4 text-center text-lg text-black">
              가입했을 때의 정보를 입력 후
              <br />
              <span className="font-bold text-black">비밀번호 재설정</span>을
              해주세요.
            </h2>
          )}

          {/* 입력 폼 */}
          <form className="onSubmit={handleSubmit} space-y-4">
            {currentTab === "id" ? (
              <>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    placeholder="휴대폰 번호"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="이메일"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-gray-700 py-2 text-white"
                >
                  아이디 찾기
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="id"
                    value={form.id}
                    placeholder="아이디"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="text"
                    value={form.name}
                    placeholder="이름"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    placeholder="휴대폰 번호(예:01012345678)"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-gray-700 py-2 text-white"
                >
                  비밀번호 재설정
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
