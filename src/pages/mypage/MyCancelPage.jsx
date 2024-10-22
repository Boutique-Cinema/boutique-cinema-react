import React, { useEffect, useState } from "react";
import { getReservationsById } from "../../api/reservationApi";
import { getMovie } from "../../api/movieApi";
import { convertRoundNumToRoundTime } from "../../util/reservationUtil";

const MEMBER_ID = "ttt123123";

export default function MyCancelPage() {
  const [visibleReservations, setVisibleReservations] = useState(5);
  const [reservationsWithMovies, setReservationsWithMovies] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        // 1. 예매 정보를 먼저 불러옴
        const reservationData = await getReservationsById(MEMBER_ID);

        // 2. isCanceled가 1인 예매만 필터링
        const filteredReservations = reservationData.filter(
          (reservation) => reservation.isCanceled === 1,
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

        // 5. 데이터를 최신순으로 정렬 (cancelDate 기준)
        reservationsWithMoviesData.sort(
          (a, b) => new Date(b.cancelDate) - new Date(a.cancelDate),
        );

        setReservationsWithMovies(reservationsWithMoviesData);
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

  if (!reservationsWithMovies[0]) {
    return (
      <div className="ml-10">
        <h2 className="mb-5 text-2xl">취소/환불 내역</h2>
        <div className="mt-20 text-center text-lg">
          취소/환불 내역이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="ml-10">
      <h2 className="mb-5 text-2xl">취소/환불 내역</h2>
      <ul className="flex flex-col gap-4">
        {reservationsWithMovies
          .slice(0, visibleReservations)
          .map((reservation, index) => (
            <li
              key={index}
              className="relative flex items-center gap-4 rounded border bg-gray-100 p-2 text-primary"
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

              <div className="font-medium">
                <div>예매 번호</div>
                <div>영화 제목</div>
                <div>상영관</div>
                <div>관람일시</div>
              </div>

              <div>
                <div>{reservation.rnum}</div>
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
                <div>{reservation.theaterNum === 0 ? "일반관" : "커플관"}</div>
                <div>
                  {reservation.reserveDate}{" "}
                  {convertRoundNumToRoundTime(
                    reservation.roundNum,
                    reservation.movie,
                  )}{" "}
                  ({reservation.roundNum}회차)
                </div>
              </div>

              <div className="ml-5 font-medium">
                <div>인원</div>
                <div>좌석 번호</div>
                <div>결제 금액</div>
                <div>결제일</div>
                <div>취소일</div>
              </div>

              <div>
                <div>
                  {Object.entries(
                    [
                      reservation.rpersonType1,
                      reservation.rpersonType2,
                      reservation.rpersonType3,
                      reservation.rpersonType4,
                      reservation.rpersonType5,
                      reservation.rpersonType6,
                    ]
                      .filter(Boolean) // null 또는 undefined 제거
                      .reduce((acc, type) => {
                        if (acc[type]) {
                          acc[type] += 1; // 동일 타입이 있으면 개수 증가
                        } else {
                          acc[type] = 1; // 처음 등장하는 타입이면 1로 설정
                        }
                        return acc;
                      }, {}),
                  )
                    .map(([type, count]) => `${type} ${count}`)
                    .join(" · ")}
                </div>
                <div>
                  {[
                    reservation.seatNum1,
                    reservation.seatNum2,
                    reservation.seatNum3,
                    reservation.seatNum4,
                    reservation.seatNum5,
                    reservation.seatNum6,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
                <div>{reservation.paymentAmount.toLocaleString()}원</div>
                <div>{new Date(reservation.regDate).toLocaleString()}</div>
                <div>{new Date(reservation.cancelDate).toLocaleString()}</div>
              </div>
            </li>
          ))}
      </ul>

      {/* 더보기 버튼 */}
      <div className="flex justify-center">
        {visibleReservations < reservationsWithMovies.length && (
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
