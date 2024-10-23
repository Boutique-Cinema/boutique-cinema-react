import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReservationsById } from "../../api/reservationApi";
import { getMovie } from "../../api/movieApi";
import { Rate } from "antd";
import "../../styles/review.css";

const MEMBER_ID = "ttt123123";

export default function MyReviewPage() {
  const navigate = useNavigate();
  const [reviewWithMovies, setReviewWithMovies] = useState([]);
  const [visibleReservations, setVisibleReservations] = useState(5);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        // 1. 예매 정보를 먼저 불러옴
        const reservationData = await getReservationsById(MEMBER_ID);

        // 2. 리뷰가 있는 예매만 필터링
        const filteredReservations = reservationData.filter(
          (reservation) => reservation.reviewContent,
        );

        // 3. movieNum으로 각 영화를 가져와 예매 정보에 추가
        const movieDetailsPromises = filteredReservations.map(
          async (reservation) => {
            const movieData = await getMovie(reservation.movieNum);
            return { ...reservation, movie: movieData }; // 영화 정보를 reservation 객체에 추가
          },
        );

        // 4. 모든 movieDetailsPromises가 완료되면 새로운 예약 정보를 저장
        const reservationsWithMoviesData =
          await Promise.all(movieDetailsPromises);

        // 5. 예약 데이터를 최신순으로 정렬 (regDate 기준)
        reservationsWithMoviesData.sort(
          (a, b) => new Date(b.regDate) - new Date(a.regDate),
        );

        setReviewWithMovies(reservationsWithMoviesData);
      } catch (error) {
        console.error("예매 정보를 들고 오는데 실패했습니다.", error);
      }
    };

    loadReservations();
  }, []);

  // "더보기" 버튼 클릭 시 더 많은 항목을 표시
  const handleShowMore = () => {
    setVisibleReservations((prev) => prev + 5); // 5개씩 추가로 보여줌
  };

  const handleGoToReviewWrite = (reservation) => {
    navigate(`/mypage/review/write`, { state: { reservation } }); // 영화번호와 예매번호를 전달
  };

  if (!reviewWithMovies[0]) {
    return (
      <div className="ml-10">
        <h2 className="mb-5 text-2xl">나의 관람평</h2>
        <div className="mt-20 text-center text-lg">
          내가 쓴 관람평이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 ml-10">
      <h2 className="mb-5 text-2xl font-medium">나의 관람평</h2>
      <ul className="flex flex-col gap-4">
        {reviewWithMovies
          .slice(0, visibleReservations)
          .map((reservation, index) => (
            <li
              key={index}
              className="relative flex rounded border bg-gray-100 p-2 text-primary"
            >
              <div className="h-full w-[100px]">
                {reservation.movie.posterUrl && (
                  <img
                    src={`http://localhost:8080/api/admin/movie/view/${reservation.movie.posterUrl}`}
                    alt={`${reservation.movie.korTitle} 포스터 이미지`}
                    className="h-full w-full rounded"
                  />
                )}
              </div>

              <div className="ml-5 mt-3 flex flex-col gap-2">
                <div className="flex gap-3">
                  <label>예매 번호</label>
                  <div>{reservation.rnum}</div>
                </div>

                <div className="flex gap-3">
                  <label>영화 제목</label>
                  <div className="flex items-center">
                    {reservation.movie.rating === "전체" ? (
                      <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-green-600 text-sm font-medium text-white">
                        All
                      </div>
                    ) : reservation.movie.rating === "12" ? (
                      <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-yellow-500 text-sm font-medium text-white">
                        12
                      </div>
                    ) : reservation.movie.rating === "15" ? (
                      <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-orange-600 text-sm font-medium text-white">
                        15
                      </div>
                    ) : (
                      <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-red-600 text-sm font-medium text-white">
                        19
                      </div>
                    )}
                    {reservation.movie.korTitle}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label>평점</label>
                  <div className="flex gap-3">
                    <Rate
                      allowClear={false}
                      allowHalf
                      defaultValue={
                        reservation.reviewContent
                          ? reservation.reviewRating / 2
                          : 5
                      }
                      className="text-xl"
                    />
                    <div className="text-lg leading-7">
                      {reservation.reviewRating}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-5 mt-3">
                <div className="flex gap-3">
                  <label>관람평</label>
                  <div className="w-[300px]">{reservation.reviewContent}</div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2">
                <button
                  className="rounded border bg-secondary px-3 py-2 text-white hover:bg-secondary-hover"
                  onClick={() => handleGoToReviewWrite(reservation)}
                >
                  수정
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* 더보기 버튼 */}
      <div className="flex justify-center">
        {visibleReservations < reviewWithMovies.length && (
          <button
            onClick={handleShowMore}
            className="mb-5 mt-10 rounded bg-secondary px-5 py-2 text-white"
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
}
