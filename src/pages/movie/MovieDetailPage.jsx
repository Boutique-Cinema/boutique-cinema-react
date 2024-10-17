import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieList } from "../../api/movieApi";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState([]);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <>
      <section className="container mx-auto p-6">
        <div className="flex">
          <img
            src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`} // API에서 가져온 포스터 URL 사용
            className="mt-4 rounded-md"
            alt={`${movie.korTitle} 포스터`}
          />
          <div className="ml-10 mt-3 flex-1">
            <span className="mb-5 block text-4xl font-bold">
              {movie.korTitle}
            </span>
            <div className="mb-10 flex space-x-2 font-medium text-gray-400">
              <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                {movie.movieStartDate} 개봉
              </span>
              <span className="border-r-4 border-r-gray-200 pr-4 text-2xl">
                {movie.runTime}분
              </span>
              <span className="text-2xl">{movie.rating}</span>
            </div>

            <p className="my-4 mb-6 max-h-48 overflow-y-auto text-2xl text-gray-200">
              {movie.movieDesc}
            </p>
            <Link
              to={`/reservation/${movie.movieNum}`}
              className="rounded-md bg-emerald-500 px-24 py-5 text-2xl text-white"
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
              <video className="h-auto w-full" controls>
                <source src={movie.trailerUrl} type="video/mp4" />
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
