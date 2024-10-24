// 아이디 비밀번호 찾기 페이지
import { useState } from "react";

export default function FindInfoPage() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    id: "",
    name: "",
    password: "",
  });

  const [currentTab, setCurrentTab] = useState("id"); // 기본은 '아이디' 탭

  const handleTabClick = (tab) => {
    setCurrentTab(tab); // 탭을 클릭할 때 상태 변경
    if (tab === "password") {
      setForm((prev) => ({
        ...prev,
        phone: "", // 비밀번호 탭으로 넘어갈 때 휴대폰 번호 초기화
      }));
    }
  };

  const onKeyUpHandler = (e) => {
    const { name } = e.target;

    if (name === "phone") {
      const numericValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김
      setForm((prev) => ({
        ...prev,
        phone: numericValue,
      }));
    }

    if (name === "id") {
      const englishValue = e.target.value.replace(/[^a-z,0-9]/g, ""); // 영어 및 숫자만 입력
      setForm((prev) => ({
        ...prev,
        id: englishValue,
      }));
    }

    if (name === "name") {
      const koreanValue = e.target.value.replace(/[^가-힣ㄱ-ㅎ]/g, ""); // 한글만 작성가능
      setForm((prev) => ({
        ...prev,
        name: koreanValue,
      }));
    }
  };

  // // case문
  // const validate = () => {
  //   switch (true) {
  //     case form.phone != null:
  //       alert("아이디를 입력해주세요.");
  //       break;
  //     case form.email != null:
  //       alert("이메일을 입력해주세요.");
  //       break;
  //     case form.name != null:
  //       alert("이름을 입력해주세요.");
  //       break;
  //     case form.id != null:
  //       alert("휴대폰 번호를 형식에 맞게 입력해주세요.");
  //       break;
  //     default:
  //       return true;
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTab === "id") {
      if (form.phone.trim() === "" || form.email.trim() === "") {
        alert("휴대폰 번호와 이메일을 입력해주세요.");
      } else {
        const { ...dataToSubmit } = form;

        const { phone, email } = dataToSubmit; // phone 과 eamil만 가져옴
        // postAdd(dataToSubmit); // JSON 형식으로 서버에 보냄

        console.log("Form submitted:", { phone, email });
        window.location.href = "/member/login"; // 아이디를 보여주는 url로 이동
      }
    } else {
      if (
        form.id.trim() === "" ||
        form.name.trim() === "" ||
        form.phone.trim() === ""
      ) {
        alert("아이디와 이름, 휴대폰 번호를 입력해주세요.");
      } else {
        const { ...dataToSubmit } = form;

        const { id, name, phone } = dataToSubmit; // id와 이름 휴대폰번호만 가져옴
        // postAdd(dataToSubmit); // JSON 형식으로 서버에 보냄

        console.log("Form submitted:", { id, name, phone });
        window.location.href = "/member/login"; // 아이디를 보여주는 url로 이동
      }
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-md bg-white p-6 shadow-md">
        <div className="w-full">
          {/* 상단 탭 */}
          <div className="mb-6 flex border-b">
            <button
              className={`w-1/2 border-b-2 ${currentTab === "id" ? "border-black text-black" : "border-transparent text-gray-400"} py-2 text-center font-bold`}
              onClick={() => handleTabClick("id")}
            >
              아이디
            </button>
            <button
              className={`w-1/2 border-b-2 ${currentTab === "password" ? "border-black text-black" : "border-transparent text-gray-400"} py-2 text-center font-bold`}
              onClick={() => handleTabClick("password")}
            >
              비밀번호
            </button>
          </div>

          {/* 페이지 헤더 */}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentTab === "id" ? (
              <>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onKeyUp={onKeyUpHandler}
                    placeholder="휴대폰 번호"
                    maxLength={11}
                    className="w-full bg-transparent text-black outline-none"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="이메일"
                    className="w-full bg-transparent text-black outline-none"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
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
                    onKeyUp={onKeyUpHandler}
                    placeholder="아이디"
                    maxLength={20}
                    className="outline-non w-full bg-transparent text-black"
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                  />
                </div>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="name" // 'name' 속성 수정
                    value={form.name}
                    onKeyUp={onKeyUpHandler}
                    placeholder="이름"
                    maxLength={20}
                    className="w-full bg-transparent text-black outline-none"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="flex items-center rounded-md border p-2">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onKeyUp={onKeyUpHandler}
                    placeholder="휴대폰 번호(예:01012345678)"
                    maxLength={11}
                    className="w-full bg-transparent text-black outline-none"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
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
