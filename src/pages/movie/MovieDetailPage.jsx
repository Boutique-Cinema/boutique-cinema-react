import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchMovieById } from "../../api/movie/movieApi"; // fetchMovieById로 수정

const MovieDetailPage = () => {
  const [movies, setMovies] = useState(null); // 영화 정보 상태 관리
  const [activeTab, setActiveTab] = useState("details"); // 기본 탭을 'details'로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [hasPurchased, setHasPurchased] = useState(false); // 구매 여부
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams(); // URL에서 id 가져오기

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      alert("로그인 후에 관람평을 작성할 수 있습니다.");
    } else if (!hasPurchased) {
      alert("구매 후에 관람평을 작성할 수 있습니다.");
    } else {
      navigate("/write-review");
    }
  };

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieById(id); // fetchMovieById로 변경
        setMovies(data);
      } catch (error) {
        console.error("영화 정보를 가져오는 데 오류가 발생했습니다:", error);
      }
    };
    loadMovieDetails();
  }, [id]);

  return (
    <>
      <section className="container mx-auto p-6">
        {movies ? ( // movies가 null이 아닐 때만 렌더링
          <div key={movies.movieNum} className="flex">
            <img
              src={movies.posterUrl} // 포스터 URL을 가져옵니다.
              className="mt-4 rounded-md"
              alt={`${movies.korTitle} 포스터`}
            />
            {/* 영화 정보 */}
            <div className="ml-10 mt-3 flex-1">
              <span className="mb-5 block text-4xl font-bold">
                {movies.korTitle}
              </span>
              <div className="mb-10 flex space-x-2 font-medium text-gray-400">
                <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                  {movies.movieStartDate} 개봉
                </span>
                <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                  {movies.runTime}분
                </span>
                <span className="text-2xl">{movies.rating}</span>
              </div>

              <p className="my-4 mb-6 max-h-48 overflow-y-auto text-2xl text-gray-200">
                {movies.desc}
              </p>
              <Link
                to={`/reservation/${movies.movieNum}`}
                className="rounded-md bg-gray-400 px-24 py-5 text-2xl text-black"
              >
                예매하기
              </Link>
            </div>
          </div>
        ) : (
          <div className="ml-10 mt-3 flex-1 text-2xl">
            Loading movie details...
          </div>
        )}
      </section>

      <section className="pb-40 pt-20 text-xl">
        <div className="flex justify-center space-x-4 text-2xl">
          <button
            className={`rounded-md p-2 transition-all duration-300 ${
              activeTab === "details"
                ? "bg-gray-700 font-bold text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => setActiveTab("details")}
          >
            상세정보
          </button>
          <button
            className={`rounded-md p-2 transition-all duration-300 ${
              activeTab === "reviews"
                ? "bg-gray-700 font-bold text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            관람평
          </button>
          <button
            className={`rounded-md p-2 transition-all duration-300 ${
              activeTab === "trailer"
                ? "bg-gray-700 font-bold text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => setActiveTab("trailer")}
          >
            트레일러
          </button>
        </div>

        <div className="mt-4 text-xl" key={movies?.movieNum}>
          {movies ? ( // movies가 null이 아닐 때만 렌더링
            activeTab === "details" && (
              <ul>
                <li className="mb-10 mt-20 text-3xl">영화정보</li>
                <li className="mb-5 ml-6 list-disc">
                  <span className="text- mr-5">장르 :</span> {movies.genre}
                </li>
                <li className="mb-5 ml-6 list-disc">
                  <span className="mr-5">감독 :</span>
                  {movies.director}
                </li>
                <li className="mb-5 ml-6 list-disc">
                  <span className="mr-5">출연 :</span>
                  {movies.cast}
                </li>
              </ul>
            )
          ) : (
            <div className="ml-10 mt-3 flex-1 text-2xl">
              Loading movie details...
            </div>
          )}
          {activeTab === "reviews" && (
            <ol>
              <li className="mb-5 mt-20 flex justify-between border p-4">
                <div className="text-2xl">
                  (영화명) 재미있게 보셨나요? 영화의 어떤점이 좋았는지
                  이야기해주세요.
                </div>
                <div
                  className="cursor-pointer p-1 text-xl"
                  onClick={handleWriteReview}
                >
                  관람평 쓰기
                </div>
              </li>
              <li>관람평 1</li>
              <li>관람평 2</li>
              <li>관람평 3</li>
            </ol>
          )}
          {activeTab === "trailer" &&
            movies?.trailerUrl && ( // trailerUrl이 있을 때만 렌더링
              <div className="mb-5 mt-20 text-3xl">
                <video className="h-auto w-full" controls>
                  <source src={movies.trailerUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
        </div>
      </section>
    </>
  );
};

export default MovieDetailPage;
