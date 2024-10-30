import { registerMovie } from "../../../api/movieApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMovieRegisterPage = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [posterUrl, setPosterUrl] = useState(""); //포스터 Url 상태추가

  // 영화 등록에 필요한 상태 초기화
  const [movie, setMovie] = useState({
    korTitle: "",
    enTitle: "",
    movieDesc: "",
    runTime: "",
    genre: "",
    file: "",
    trailerUrl: "",
    director: "",
    cast: "",
    rating: "",
    movieStartDate: new Date(),
    movieEndDate: new Date(),
    theaterNum: "",
    round1: 0,
    round2: 0,
    round3: 0,
    round4: 0,
    round5: 0,
    roundTime1: "09:00",
    roundTime2: "12:00",
    roundTime3: "15:00",
    roundTime4: "18:00",
    roundTime5: "21:00",
    regDate: formattedDate,
  });

  const navigate = useNavigate(); // 등록 처리 후 페이지 이동

  // 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 영화 종료일이 변경되는 경우
    if (name === "movieEndDate") {
      const startDate = new Date(movie.movieStartDate);
      const endDate = new Date(value);

      // 종료일이 개봉일보다 이전인 경우 경고
      if (endDate < startDate) {
        alert("상영 종료일은 개봉일보다 이전일 수 없습니다.");
        return; // 상태 업데이트를 하지 않음
      }
    }

    setMovie({
      ...movie,
      [name]: value,
    }); // 상태 업데이트
  };

  // 파일 입력 처리 함수
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      // FileReader를 사용하여 파일 읽기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterUrl(reader.result); // 포스터 URL을 임시로 저장
      };
      reader.readAsDataURL(file); // 파일을 URL로 읽기
    }

    setMovie({ ...movie, [name]: file }); // 파일 상태 업데이트
  };

  //체크박스 등록 제출 처리 함수
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // 체크된 경우 true, 체크 해제된 경우 false로 상태 업데이트
    setMovie({ ...movie, [name]: checked ? 1 : 0 });
  };

  // 영화 등록 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const formData = new FormData();

    // 영화 데이터를 FormData에 추가
    for (const key in movie) {
      formData.append(key, movie[key]);
    }

    try {
      await registerMovie(formData); // 영화 등록 API 호출
      alert("등록이 완료되었습니다."); // 알림 추가
      navigate("/admin/movie/list"); // 등록 완료 후 이동
    } catch (error) {
      console.error("영화 등록 실패:", error);

      // 에러가 JWT 관련인지 확인
      if (
        error.response &&
        error.response.data.error === "ERROR_ACCESS_TOKEN"
      ) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      } else {
        alert("영화 등록에 실패했습니다. 다시 시도해주세요."); // 일반 오류 메시지
      }
    }
  };

  return (
    <div className="bg-gray-800 p-10 shadow-lg">
      <div className="mb-4 text-2xl font-extrabold">영화 등록</div>
      <div className="my-5 border-b border-gray-600"></div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-1 font-medium text-gray-200">제목</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="korTitle"
              value={movie.korTitle}
              maxLength={30}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">영문 제목</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="enTitle"
              value={movie.enTitle}
              maxLength={50}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">영화 소개</div>
            <textarea
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              name="movieDesc"
              value={movie.movieDesc}
              placeholder="500자 이내로 작성해주세요"
              maxLength={500}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">상영시간 (분)</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="runTime"
              value={movie.runTime}
              placeholder="ex) 80"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">장르</div>
            <select
              name="genre"
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              value={movie.genre}
              onChange={handleChange}
            >
              <option>장르 선택</option>
              <option value={"액션"}>액션</option>
              <option value={"드라마"}>드라마</option>
              <option value={"코미디"}>코미디</option>
              <option value={"로맨스"}>로맨스</option>
              <option value={"공포"}>공포</option>
              <option value={"SF"}>SF</option>
              <option value={"판타지"}>판타지</option>
              <option value={"애니메이션"}>애니메이션</option>
              <option value={"다큐멘터리"}>다큐멘터리</option>
              <option value={"뮤지컬"}>뮤지컬</option>
            </select>
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">포스터 이미지</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
            {posterUrl && (
              <div className="mt-2">
                <img
                  src={posterUrl}
                  alt="포스터 미리보기"
                  className="h-[200px] w-[160px] rounded object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">예고편 URL</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="trailerUrl"
              value={movie.trailerUrl}
              placeholder="유튜브 URL 입력"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">감독</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="director"
              value={movie.director}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">출연진</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="cast"
              value={movie.cast}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">관람등급</div>
            <select
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
            >
              <option>관람등급 선택</option>
              <option value={"전체"}>전체 이용가</option>
              <option value={"12"}>12세 이용가</option>
              <option value={"15"}>15세 이용가</option>
              <option value={"19"}>청소년 관람불가</option>
            </select>
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">개봉일</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-100 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="date"
              name="movieStartDate"
              value={movie.movieStartDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">상영 종료일</div>
            <input
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              type="date"
              name="movieEndDate"
              value={movie.movieEndDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-1 font-medium text-gray-200">상영관</div>
            <select
              name="theaterNum"
              className="block w-full rounded-md border border-gray-600 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500"
              value={movie.theaterNum}
              onChange={handleChange}
            >
              <option>상영관 선택</option>
              <option value={0}>일반관</option>
              <option value={1}>커플관</option>
            </select>
          </div>

          <div>
            <div>
              <div className="mb-1 font-medium text-gray-200">
                영화 시작시간
              </div>
              <label className="text-gray-200">
                <input
                  className="mr-1"
                  type="checkbox"
                  name="round1"
                  checked={movie.round1 === 1}
                  onChange={handleCheckboxChange}
                />
                09:00
              </label>
              <label className="text-gray-200">
                <input
                  className="ml-2 mr-1"
                  type="checkbox"
                  name="round2"
                  checked={movie.round2 === 1}
                  onChange={handleCheckboxChange}
                />
                12:00
              </label>
              <label className="text-gray-200">
                <input
                  className="ml-2 mr-1"
                  type="checkbox"
                  name="round3"
                  checked={movie.round3 === 1}
                  onChange={handleCheckboxChange}
                />
                15:00
              </label>
              <label className="text-gray-200">
                <input
                  className="ml-2 mr-1"
                  type="checkbox"
                  name="round4"
                  checked={movie.round4 === 1}
                  onChange={handleCheckboxChange}
                />
                18:00
              </label>
              <label className="text-gray-200">
                <input
                  className="ml-2 mr-1"
                  type="checkbox"
                  name="round5"
                  checked={movie.round5 === 1}
                  onChange={handleCheckboxChange}
                />
                21:00
              </label>
            </div>
          </div>

          <button
            className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white transition hover:bg-blue-700"
            type="submit"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminMovieRegisterPage;
