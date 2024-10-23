import { getMovie } from "../../api/movieApi";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const { movieNum } = useParams(); // URL 파라미터에서 영화 번호로 조회
  const [posterUrl, setPosterUrl] = useState(""); //포스터 Url 상태추가
  const [activeTab, setActiveTab] = useState("details");

  // 영화 수정에 필요한 상태 초기화
  const [movie, setMovie] = useState({
    korTitle: "",
    enTitle: "",
    movieDesc: "",
    runTime: "",
    genre: "",
    trailerUrl: "",
    director: "",
    cast: "",
    rating: "",
    posterUrl: "",
    movieStartDate: new Date(),
    theaterNum: "",
    regDate: formattedDate,
  });

  const navigate = useNavigate(); // 수정 처리 후 페이지 이동

  // 영화 세부정보 데이터 가져오기
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieData = await getMovie(movieNum); // 영화 데이터 가져오기
        setMovie({
          ...movie,
          ...movieData, // 기존 데이터로 상태 업데이트
          movieStartDate: movieData.movieStartDate.split("T")[0], // 날짜 형식 변환
          movieEndDate: movieData.movieEndDate.split("T")[0], // 날짜 형식 변환
        });
      } catch (error) {
        console.error("영화 데이터 가져오기 실패:", error);
      }
    };

    fetchMovieDetail(); // 영화 데이터 호출
  }, [movieNum]); // movieNum이 변경될 때마다 호출

  return (
    <>
      <section className="container mx-auto mb-20">
        <div className="flex">
          <img
            src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
            className="mt-4 h-80 w-56"
            alt={`${movie.korTitle} 포스터`}
          />
          <div className="ml-10 mt-3 flex-1">
            <span className="mb-5 block text-4xl font-bold">
              {movie.korTitle}
            </span>
            <div className="mb-10 flex space-x-2 font-medium">
              <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                {new Date(movie.movieStartDate).toLocaleDateString()} 개봉
              </span>
              <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                {movie.runTime}분
              </span>
              <div className="flex gap-3">
                {/* 관람등급 표시 */}
                {movie.rating === "전체" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-green-600 font-medium">
                    All
                  </div>
                ) : movie.rating === "12" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-yellow-500 font-medium">
                    12
                  </div>
                ) : movie.rating === "15" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-600 font-medium">
                    15
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-red-600 font-medium">
                    19
                  </div>
                )}
              </div>
            </div>

            <p className="my-4 mb-12 max-h-48 overflow-y-auto text-2xl text-gray-200">
              {movie.movieDesc}
            </p>

            <Link
              to={`/reserve`}
              className="rounded-md bg-emerald-500 px-24 py-4 text-2xl text-white"
            >
              예매하기
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-40 pt-20 text-xl">
        <div className="flex justify-center space-x-4 text-2xl">
          <button
            className={`rounded-md p-2 ${
              activeTab === "details"
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setActiveTab("details")}
          >
            상세정보
          </button>
          <button
            className={`rounded-md p-2 ${
              activeTab === "reviews"
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            관람평
          </button>
          <button
            className={`rounded-md p-2 ${
              activeTab === "trailer"
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setActiveTab("trailer")}
          >
            트레일러
          </button>
        </div>

        <div className="mt-4 text-xl">
          {activeTab === "details" && (
            <ul>
              <li className="mb-10 mt-20 text-3xl">영화정보</li>
              <li className="mb-5 ml-6 list-disc">
                <span className="mr-5">장르 :</span> {movie.genre}
              </li>
              <li className="mb-5 ml-6 list-disc">
                <span className="mr-5">감독 :</span> {movie.director}
              </li>
              <li className="mb-5 ml-6 list-disc">
                <span className="mr-5">출연 :</span> {movie.cast}
              </li>
            </ul>
          )}

          {activeTab === "reviews" && <div>리뷰 영역</div>}

          {activeTab === "trailer" && movie.trailerUrl && (
            <div className="mb-5 mt-20 text-3xl">
              <iframe
                width="100%"
                height="auto"
                src={movie.trailerUrl.replace("watch?v=", "embed/")}
                title="트레일러"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ aspectRatio: "16/9" }} // 비율을 유지하기 위해 사용
              ></iframe>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieDetailPage;
