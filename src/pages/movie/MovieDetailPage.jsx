import { getMovie } from "../../api/movieApi";
import { getAllReservations } from "../../api/reservationApi";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useCustomLogin from "../../hook/useCustomLogin";

const MovieDetailPage = () => {
  const { movieNum } = useParams();
  const [activeTab, setActiveTab] = useState("details");
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
    movieStartDate: "",
    regDate: new Date().toISOString().split("T")[0],
  });
  const [review, setReview] = useState([]); // 리뷰
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [hasReservation, setHasReservation] = useState(false); // 예매 상태
  const { isLogin, moveToLogin } = useCustomLogin(); // 로그인 훅 사용
  const navigate = useNavigate();
  const [newReview] = useState(""); // 새로운 리뷰 상태

  // 영화 세부정보 가져오기
  useEffect(() => {
    const fetchMovieDetail = async () => {
      const movieData = await getMovie(movieNum);
      setMovie({
        ...movieData,
        movieStartDate: movieData.movieStartDate.split("T")[0],
      });
    };
    fetchMovieDetail();
  }, [movieNum]);

  // 예매내역 가져오기
  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await getAllReservations();
        // null이 아닌 리뷰만 필터링하여 상태를 설정
        const validReviews = Array.isArray(data)
          ? data
              .filter((reservation) => reservation.reviewContent)
              .sort((a, b) => new Date(b.regDate) - new Date(a.regDate)) // 등록일 내림차순 정렬
          : [];
        setReview(validReviews);
        //예매 여부 확인 로직 추가
        if (Array.isArray(data) && data.length > 0) {
          setHasReservation(true); // 예매가 있으면 true
        } else {
          setHasReservation(false); // 예매가 없으면 false
        }
      } catch (error) {
        setReview([]);
        setHasReservation(false); // 에러 발생 시 예매가 없다고 간주
      }
    };
    loadReservations();
  }, []);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = review.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(review.length / reviewsPerPage);

  const handleReviewSubmit = async () => {
    if (!isLogin) {
      alert("로그인 페이지로 이동합니다.");
      moveToLogin();
    } else if (!hasReservation) {
      alert("예매 후 리뷰를 작성할 수 있습니다.");
    } else if (!newReview.trim()) {
      alert("리뷰 작성 페이지로 이동합니다.");
      navigate("/mypage/reserve");
    }
  };

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
            <h1 className="mb-5 text-4xl font-bold">{movie.korTitle}</h1>
            <div className="mb-10 flex space-x-2 font-medium">
              <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                {new Date(movie.movieStartDate).toLocaleDateString()} 개봉
              </span>
              <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                {movie.runTime}분
              </span>
              <div className="flex gap-3">
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

      <section className="mb-32 pb-40 pt-20 text-xl">
        <div className="flex justify-center space-x-4 text-2xl">
          {["details", "reviews", "trailer"].map((tab) => (
            <button
              key={tab}
              className={`rounded-md p-2 ${activeTab === tab ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "details"
                ? "상세정보"
                : tab === "reviews"
                  ? "관람평"
                  : "트레일러"}
            </button>
          ))}
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

          {activeTab === "reviews" && (
            <div>
              <h3 className="mb-4 mt-20 text-3xl">관람평</h3>
              <div className="mb-4 mt-4 flex justify-between">
                <div className="flex space-x-2"></div>
                <button
                  onClick={handleReviewSubmit} // 리뷰 제출 핸들러
                  className="rounded-md bg-none px-4 py-2 text-white"
                >
                  리뷰 작성
                </button>
              </div>

              {currentReviews.map((reservation, index) => (
                <div
                  key={index}
                  className="mb-6 flex items-center rounded-lg border bg-none p-4 shadow-md"
                >
                  <span className="text-gray-500">
                    <strong>{reservation.mid}</strong>
                  </span>
                  <p className="mx-4 ml-10 flex-1 text-lg">
                    {reservation.reviewContent}
                  </p>
                  <span className="text-base text-gray-400">
                    작성일: {new Date(reservation.regDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-md bg-none px-4 py-2"
                >
                  이전
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-md bg-none px-4 py-2"
                >
                  다음
                </button>
              </div>
            </div>
          )}

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
                style={{ aspectRatio: "16/9" }}
              ></iframe>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieDetailPage;
