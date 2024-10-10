// 회원가입 페이지
import { useState } from "react";
import Logo from "../common/Logo";
import { postAdd } from "../../api/membersApi";

function JoinPage() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
    name: "",
    birth: "",
    phone: "",
    years_14_more: false,
    use_terms_agree: false,
    personal_info_agree: false,
  });

  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용가능한지 아닌지

  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [isPwAvailable, setIsPwAvailable] = useState(false);

  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");
  const [isPwConfirmPassword, setIsPwConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  const [isNameFocused, setIsNameFocused] = useState(false); // 이름 입력창에 focus가 있는지 확인
  // const [name, setName] = useState("");
  // const [nameError, setNameError] = useState("");
  // const [isNameAvailable, setIsNameAvailable] = useState(false);

  const [birth, setBirth] = useState("");
  const [birthError, setBirthError] = useState("");
  const [isBirthAvailable, setIsBirthAvailable] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 아이디 입력 시 idCheckHandler 호출
    if (name === "id") {
      idCheckHandler(value); // 아이디 체크 함수 호출
    }
    // 비밀번호 입력 시 pwCheckHandler 호출
    if (name === "password") {
      pwCheckHandler(value); // 비밀번호 체크 함수 호출
    }
    // 비밀번호 확인이 비밀번호랑 같은지 확인하는 함수 호출
    if (name === "passwordConfirm") {
      pwConfirmHandler(value);
    }
    if (name === "email") {
      emailCheckHandler(value); // 이메일 체크 함수 호출
    }
    if (name === "birth") {
      birthCheckHandler(value); // 생년월일 체크 함수 호출
    }
    if (name === "phone") {
      phoneCheckHandler(value); // 휴대폰번호 체크 함수 호출
    }
  };

  // 아이디 체크 핸들러
  const idCheckHandler = async (id) => {
    const idRegex = /^[a-z\d]{8,20}$/;
    if (id === "") {
      setIdError("아이디를 입력하세요.");
      setIsIdAvailable(false);
      return false;
    } else if (!idRegex.test(id)) {
      setIdError("8~20자의 영문/숫자만 입력 가능합니다.");
      setIsIdAvailable(false);
      return false;
    } else {
      setIdError("사용 가능한 아이디입니다.");
      setIsIdAvailable(true);
      return true;
    }
  };

  // 비밀번호 체크 핸들러
  const pwCheckHandler = async (password) => {
    const pwRegex = /^[a-z\d]{8,20}$/;
    if (password === "") {
      setPwError("비밀번호를 입력하세요.");
      setIsPwAvailable(false);
    } else if (!pwRegex.test(password)) {
      setPwError("8~20자의 영문/숫자만 입력 가능합니다.");
      setIsPwAvailable(false);
    } else {
      setPwError("");
      setIsPwAvailable(true);
    }
  };

  // 비밀번호 확인 체크 핸들러
  const pwConfirmHandler = async (passwordConfirm) => {
    if (passwordConfirm !== form.password) {
      setPwConfirmError("비밀번호가 다릅니다.");
      setIsPwConfirmPassword(false);
    } else {
      setPwConfirmError("");
      setIsPwConfirmPassword(true);
    }
  };

  // 이메일 체크 핸들러
  const emailCheckHandler = async (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
      setEmailError("이메일을 입력하세요.");
      setIsEmailAvailable(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("정확한 메일주소를 입력해주세요.");
      setIsEmailAvailable(false);
    } else {
      setEmailError("");
      setIsEmailAvailable(true);
    }
  };

  // 생년월일 체크 핸들러
  const birthCheckHandler = async (birth) => {
    const birthRegex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    if (birth === "") {
      setBirthError("생년월일을 입력하세요.");
      setIsBirthAvailable(false);
    } else if (!birthRegex.test(birth)) {
      setBirthError("올바른 생년월일을 입력하세요.");
      setIsBirthAvailable(false);
    } else {
      setBirthError("");
      setIsBirthAvailable(true);
    }
  };

  // 휴대폰번호 체크 핸들러
  const phoneCheckHandler = async (phone) => {
    const phoneRegex = /^\d{10,11}$/;
    if (phone === "") {
      setPhoneError("휴대폰 번호를 입력하세요.");
      setIsPhoneAvailable(false);
    } else if (!phoneRegex.test(phone)) {
      setPhoneError('" - "없이 입력해주세요.');
      setIsPhoneAvailable(false);
    } else {
      setPhoneError("");
      setIsPhoneAvailable(true);
    }
  };

  // 숫자만 입력
  const onKeyUpHandler = (e) => {
    const { name } = e.target;

    if (name === "birth") {
      const numericValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김
      setForm((prev) => ({
        ...prev,
        birth: numericValue,
      }));
    }
    if (name === "phone") {
      const numericValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김
      setForm((prev) => ({
        ...prev,
        phone: numericValue,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "allCheck") {
      // 전체동의 체크박스 클릭시 전체 체크박스 선택
      setForm((prev) => ({
        ...prev,
        years_14_more: checked ? 1 : 0,
        use_terms_agree: checked ? 1 : 0,
        personal_info_agree: checked ? 1 : 0,
        allCheck: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      }));
    }
  };
  // case문
  const validate = () => {
    switch (true) {
      case isIdAvailable === false:
        alert("아이디를 확인해주세요.");
        break;
      case isPwAvailable === false:
        alert("비밀번호를 형식에 맞게 입력해주세요.");
        break;
      case isPwConfirmPassword === false:
        alert("비밀번호 확인이 비밀번호랑 다릅니다.");
        break;
      case isEmailAvailable === false:
        alert("이메일을 형식에 맞게 입력해주세요.");
        break;
      case form.name === "":
        alert("이름을 입력해주세요.");
        break;
      case isBirthAvailable === false:
        alert("생년월일을 형식에 맞게 입력해주세요.");
        break;
      case isPhoneAvailable === false:
        alert("휴대폰 번호를 형식에 맞게 입력해주세요.");
        break;
      case form.years_14_more === false:
        alert("만 14세 이상만 회원가입이 가능합니다.");
        break;
      case form.use_terms_agree === false:
        alert("이용약관 동의는 필수입니다.");
        break;
      case form.personal_info_agree === false:
        alert("개인정보 수집·동의는 필수입니다.");
        break;
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() === true) {
      // 오늘 날짜를 YYYY-MM-DD 형식으로 생성
      const today = new Date();
      const joinDate = today.toISOString().split("T")[0]; // YYYY-MM-DD 형식

      // 폼 데이터에 날짜 추가
      const formDataWithDate = {
        ...form,
        joinDate,
      };

      postAdd(form); // JSON 형식으로 서버에 보냄

      console.log("Form submitted:", form);
      alert("회원가입이 완료됐습니다.");
      window.location.href = "/";
    }
  };

  return (
    <div className="mb-16 mt-10 flex h-screen items-center justify-center">
      <div>
        <a href="/">
          <Logo />
        </a>
        <form
          onSubmit={handleSubmit}
          className="w-[330px] rounded-lg bg-white p-5 shadow-md"
        >
          <h2 className="mb-2 text-lg font-medium text-black">회원가입</h2>
          <div className="overflow-hidden rounded border border-gray-300">
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={onChangeHandler}
              placeholder="아이디"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {idError && (
            <small
              className={`${isIdAvailable ? "text-blue-600" : "text-red-600"} p-2 text-[10px]`}
            >
              {idError}
            </small>
          )}

          <div className="mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChangeHandler}
              placeholder="비밀번호"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {pwError && (
            <small
              className={`${isPwAvailable ? "" : "text-red-600"} p-2 text-[10px]`}
            >
              {pwError}
            </small>
          )}

          <div className="mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={onChangeHandler}
              placeholder="비밀번호 확인"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {pwConfirmError && (
            <small
              className={`${isPwConfirmPassword ? "" : "text-red-600"} p-2 text-[10px]`}
            >
              {pwConfirmError}
            </small>
          )}

          <div className="mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChangeHandler}
              placeholder="이메일"
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {emailError && (
            <small
              className={`${isEmailAvailable ? "text-blue-600" : "text-red-600"} p-2 text-[10px]`}
            >
              {emailError}
            </small>
          )}

          <div className="mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setIsNameFocused(true)} // 포커스 시 true로 설정
              onBlur={() => setIsNameFocused(false)} // 포커스 아웃 시 false로 설정
              placeholder="이름"
              maxLength={20}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          <small
            className={`${isNameFocused ? "text-red-600" : ""} p-2 text-[10px]`}
          >
            {isNameFocused && "이름은 반드시 실명만 입력해주세요."}{" "}
            {/* 포커스가 있을 때만 메시지 출력 */}
          </small>

          <div className="overflow-hidden rounded border border-gray-300">
            <input
              type="text"
              name="birth"
              value={form.birth}
              onChange={onChangeHandler}
              onKeyUp={onKeyUpHandler} // onKeyUp 추가
              placeholder="생년월일(예:20010203)"
              maxLength={8}
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {birthError && (
            <small
              className={`${isBirthAvailable ? "text-blue-600" : "text-red-600"} p-2 text-[10px]`}
            >
              {birthError}
            </small>
          )}

          <div className="mt-4 overflow-hidden rounded border border-gray-300">
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={onChangeHandler}
              onKeyUp={onKeyUpHandler} // onKeyUp 추가
              maxLength={11}
              placeholder="휴대폰 번호(예:01012345678)"
              className="box-border h-full w-full p-2 text-sm text-black"
            />
          </div>
          {phoneError && (
            <small
              className={`${isPhoneAvailable ? "text-blue-600" : "text-red-600"} p-2 text-[10px]`}
            >
              {phoneError}
            </small>
          )}

          <h2 className="mb-2 mt-4 font-medium text-black">이용약관 동의</h2>

          <div className="h-200 mb-4 justify-center overflow-hidden rounded border border-gray-300 bg-gray-100 p-2">
            <div className="flex h-5 w-full items-center justify-end text-black">
              <input
                type="checkbox"
                name="allCheck"
                id="allCheck"
                checked={form.allCheck} // 전체동의 체크박스를 누르면 모든 체크박스 체크
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="allCheck" className="w-full p-2 text-xs">
                전체동의
              </label>
            </div>
            <hr className="boder-t my-2 border-gray-300" />
            <div className="flex h-5 w-full items-center justify-end text-gray-500">
              <input
                type="checkbox"
                name="years_14_more"
                id="years_14_more"
                checked={form.years_14_more}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="years_14_more" className="w-full p-2 text-xs">
                만 14세 이상입니다
                <label className="text-xs text-red-500"> (필수)</label>
              </label>
            </div>
            <hr className="boder-t my-2 border-gray-300" />
            <div className="flex h-5 w-full items-center justify-end text-gray-500">
              <input
                type="checkbox"
                name="use_terms_agree"
                id="use_terms_agree"
                checked={form.use_terms_agree}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <label htmlFor="use_terms_agree" className="w-full p-2 text-xs">
                이용약관 동의
                <label className="text-xs text-red-500"> (필수)</label>
              </label>
              <a
                href="/support/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto whitespace-nowrap text-xs text-gray-500 underline"
              >
                내용보기
              </a>
            </div>
            <hr className="boder-t my-2 border-gray-300" />
            <div className="flex h-5 w-full items-center justify-end text-gray-500">
              <input
                type="checkbox"
                name="personal_info_agree"
                id="personal_info_agree"
                checked={form.personal_info_agree}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <label
                htmlFor="personal_info_agree"
                className="w-full p-2 text-xs"
              >
                개인정보 수집·이용 동의
                <label className="text-xs text-red-500"> (필수)</label>
              </label>
              <a
                href="/support/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto whitespace-nowrap text-xs text-gray-500 underline"
              >
                내용보기
              </a>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full cursor-pointer rounded border-none bg-gray-700 p-2 text-white"
          >
            가입완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;
