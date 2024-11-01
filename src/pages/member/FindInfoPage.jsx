import { useState } from "react";
import { findId, checkMember, resetPassword } from "../../api/membersApi";
import useCustomLogin from "../../hook/useCustomLogin";

export default function FindInfoPage() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    id: "",
    name: "",
    password: "",
    passwordCheck: "",
  });

  const [currentTab, setCurrentTab] = useState("id");
  const [foundId, setFoundId] = useState("");
  const [isIdFound, setIsIdFound] = useState(false);
  const [CheckFound, setCheckFound] = useState("");
  const [isCheckFound, setIsCheckFound] = useState(false);
  const { moveToLogin } = useCustomLogin();

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    if (tab === "password") {
      setForm({ ...form, phone: "", id: "", name: "" });
      setIsIdFound(false);
    } else {
      setForm({ ...form, phone: "", email: "" });
    }
  };

  const onKeyUpHandler = (e) => {
    const { name } = e.target;

    if (name === "phone") {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      setForm((prev) => ({ ...prev, phone: numericValue }));
    }

    if (name === "id") {
      const englishValue = e.target.value.replace(/[^a-z,0-9]/g, "");
      setForm((prev) => ({ ...prev, id: englishValue }));
    }

    if (name === "name") {
      const koreanValue = e.target.value.replace(/[^가-힣ㄱ-ㅎ]/g, "");
      setForm((prev) => ({ ...prev, name: koreanValue }));
    }

    if (name === "password") {
      const englishValue = e.target.value.replace(/[^a-z,0-9]/g, "");
      setForm((prev) => ({ ...prev, password: englishValue }));
    }
    if (name === "passwordCheck") {
      const englishValue = e.target.value.replace(/[^a-z,0-9]/g, "");
      setForm((prev) => ({ ...prev, passwordCheck: englishValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentTab === "id") {
      if (form.phone.trim() === "" || form.email.trim() === "") {
        alert("휴대폰 번호와 이메일을 입력해주세요.");
      } else {
        try {
          const id = await findId({ phone: form.phone, email: form.email }); // 비동기 호출
          setFoundId(id); // 찾은 아이디 저장
          setIsIdFound(true); // 아이디 찾기 성공 상태
        } catch (error) {
          alert("아이디를 찾지 못했습니다.");
        }
      }
    } else {
      if (
        form.id.trim() === "" ||
        form.name.trim() === "" ||
        form.phone.trim() === ""
      ) {
        alert("아이디와 이름, 휴대폰 번호를 입력해주세요.");
      } else {
        try {
          const check = await checkMember({
            id: form.id,
            name: form.name,
            phone: form.phone,
          }); // 비동기 호출
          setIsCheckFound(check); // 회원이면 true, 아니면 false
          setIsCheckFound(true); // 회원 찾기 성공 상태
        } catch (error) {
          alert("회원정보가 맞지 않습니다.");
        }
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (form.password !== form.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // restPassword API 호출
      await resetPassword(form.id, form.password);
      alert("비밀번호 변경에 성공했습니다!");
      moveToLogin();
    } catch (error) {
      console.error("비밀번호 재설정 실패: ", error);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-md bg-white p-6 shadow-md">
      <div className="w-full">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentTab === "id" && !isIdFound ? (
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
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="flex items-center rounded-md border p-2">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="이메일"
                  className="w-full bg-transparent text-black outline-none"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gray-700 py-2 text-white"
              >
                아이디 찾기
              </button>
            </>
          ) : currentTab === "id" && isIdFound ? (
            <div className="mt-4">
              <input
                type="text"
                value={foundId}
                readOnly
                className="w-full rounded-md bg-gray-100 p-2 text-black"
                placeholder="찾은 아이디"
              />
              <button
                type="submit"
                className="mt-4 w-full cursor-pointer rounded border-none bg-gray-700 p-2 text-white"
                onClick={moveToLogin}
              >
                로그인
              </button>
            </div>
          ) : null}
          {currentTab === "password" && !isCheckFound ? (
            <>
              <div className="flex items-center rounded-md border p-2">
                <input
                  type="text"
                  name="id"
                  value={form.id}
                  onKeyUp={onKeyUpHandler}
                  placeholder="아이디"
                  maxLength={20}
                  className="w-full bg-transparent text-black outline-none"
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                />
              </div>
              <div className="flex items-center rounded-md border p-2">
                <input
                  type="text"
                  name="name"
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
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gray-700 py-2 text-white"
              >
                비밀번호 재설정
              </button>
            </>
          ) : currentTab === "password" && isCheckFound ? (
            <div className="mt-4">
              <input
                type="text"
                value={form.password}
                className="mb-4 w-full rounded-md bg-gray-100 p-2 text-black"
                placeholder="새로운 비밀번호(영문,숫자조합(8~20글자)"
                maxLength={20}
                onChange={(e) => {
                  const newValue = e.target.value; // 원래 입력값 가져오기
                  const englishValue = newValue.replace(/[^a-zA-Z0-9]/g, ""); // 영어 대소문자와 숫자만 허용
                  setForm({ ...form, password: englishValue });
                }}
              />
              <input
                type="password"
                value={form.passwordCheck}
                className="w-full rounded-md bg-gray-100 p-2 text-black"
                placeholder="비밀번호 확인(영문,숫자조합(8~20글자)"
                maxLength={20}
                onChange={(e) => {
                  const newValue = e.target.value; // 원래 입력값 가져오기
                  const englishValue = newValue.replace(/[^a-zA-Z0-9]/g, ""); // 영어 대소문자와 숫자만 허용
                  setForm({ ...form, passwordCheck: englishValue });
                }}
              />

              <button
                type="submit"
                className="mt-4 w-full cursor-pointer rounded border-none bg-gray-700 p-2 text-white"
                onClick={handleResetPassword}
              >
                비밀번호 재설정
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
