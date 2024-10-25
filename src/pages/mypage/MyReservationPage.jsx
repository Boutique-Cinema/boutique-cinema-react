import React, { useEffect, useState } from "react";
import {
  cancelReservation,
  getReservationsById,
} from "../../api/reservationApi";
import { getMovie } from "../../api/movieApi";
import { useNavigate } from "react-router-dom";
import RefundModal from "../../components/mypage/RefundModal";
import { convertRoundNumToRoundTime } from "../../util/reservationUtil";
import { useSelector } from "react-redux";

export default function MyReservationPage() {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedRnum, setSelectedRnum] = useState(null);
  const [visibleReservations, setVisibleReservations] = useState(5);
  const [reservationsWithMovies, setReservationsWithMovies] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        // 1. 예매 정보를 먼저 불러옴
        const reservationData = await getReservationsById(loginState.id);

        // 2. 취소 안된 예매만 필터링
        const filteredReservations = reservationData.filter(
          (reservation) => !reservation.isCanceled,
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

        setReservationsWithMovies(reservationsWithMoviesData);
      } catch (error) {
        console.error("예매 정보를 들고 오는데 실패했습니다.", error);
      }
    };

    loadReservations();
  }, [loginState.id]);

  // "더보기" 버튼 클릭 시 더 많은 항목을 표시
  const handleShowMore = () => {
    setVisibleReservations((prev) => prev + 5); // 5개씩 추가로 보여줌
  };

  // 예매 취소시 모달창 띄우는 핸들러
  const handleCancelClick = (rnum) => {
    setSelectedRnum(rnum); // 선택한 예매 번호 저장
    setShowRefundModal(true); // 모달 열기
  };

  // 예매 취소 핸들러
  const handleCancel = async () => {
    const isConfirmed = window.confirm("정말 예매를 취소하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    try {
      await cancelReservation(selectedRnum);
      setShowRefundModal(false); // 모달 닫기

      // 예매 취소 성공 시, "/mypage/cancel" 경로로 이동
      navigate("/mypage/cancel");
    } catch (error) {
      alert("예매 취소에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 영화가 이미 시작했는지 확인하는 함수
  const isMovieStarted = (reserveDate, roundNum, movie) => {
    const reserveTime = convertRoundNumToRoundTime(roundNum, movie);

    const movieStartTime = new Date(reserveDate + " " + reserveTime).getTime(); // 영화 시작 시간
    const currentTime = new Date().getTime(); // 현재 시간

    return currentTime >= movieStartTime; // 영화가 이미 시작했는지 여부
  };

  // 리뷰 작성 페이지로 이동하는 함수
  const handleGoToReviewWrite = (reservation) => {
    navigate(`/mypage/review/write`, { state: { reservation } }); // 영화번호와 예매번호를 전달
  };

  if (!reservationsWithMovies[0]) {
    return (
      <div className="ml-10">
        <h2 className="mb-5 text-2xl">예매내역</h2>
        <div className="mt-20 text-center text-lg">예매내역이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mb-10 ml-10">
      <h2 className="mb-5 text-2xl font-medium">예매내역</h2>
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
              </div>

              <div className="absolute right-2 flex flex-col gap-3">
                <button
                  className={`rounded border p-3 text-white ${
                    !isMovieStarted(
                      reservation.reserveDate,
                      reservation.roundNum,
                      reservation.movie,
                    )
                      ? "bg-gray-400"
                      : "bg-secondary hover:bg-secondary-hover"
                  }`}
                  disabled={
                    !isMovieStarted(
                      reservation.reserveDate,
                      reservation.roundNum,
                      reservation.movie,
                    )
                  }
                  onClick={() => handleGoToReviewWrite(reservation)}
                >
                  {reservation.reviewContent ? "관람평 수정" : "관람평 등록"}
                </button>
                <button
                  className={`rounded border p-3 text-white ${
                    isMovieStarted(
                      reservation.reserveDate,
                      reservation.roundNum,
                      reservation.movie,
                    )
                      ? "bg-primary"
                      : "bg-tertiary hover:bg-tertiary-hover"
                  }`}
                  disabled={isMovieStarted(
                    reservation.reserveDate,
                    reservation.roundNum,
                    reservation.movie,
                  )}
                  onClick={() => handleCancelClick(reservation.rnum)}
                >
                  {isMovieStarted(
                    reservation.reserveDate,
                    reservation.roundNum,
                    reservation.movie,
                  )
                    ? "상영완료"
                    : "예매취소"}
                </button>
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

      {/* 환불 규정 모달 */}
      {showRefundModal && (
        <RefundModal
          onClose={() => setShowRefundModal(false)}
          onConfirm={handleCancel}
        />
      )}
    </div>
  );
}
