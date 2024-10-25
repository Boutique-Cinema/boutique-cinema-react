import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getMovie } from "../../api/movieApi";
import { getReservationByRnum } from "../../api/reservationApi";

export default function ReservationSuccessPage() {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState({});
  const [reservation, setReservation] = useState({});
  const [roundTime, setRoundTime] = useState("");

  const orderId = searchParams.get("orderId");

  const {
    movieNum,
    paymentAmount,
    regDate,
    reserveDate,
    rnum,
    roundNum,
    rpersonType1,
    rpersonType2,
    rpersonType3,
    rpersonType4,
    rpersonType5,
    rpersonType6,
    seatNum1,
    seatNum2,
    seatNum3,
    seatNum4,
    seatNum5,
    seatNum6,
    theaterNum,
  } = reservation;

  useEffect(() => {
    const loadReservation = async () => {
      const reservation = await getReservationByRnum(orderId);
      setReservation(reservation);
    };
    loadReservation();

    if (!movieNum) return;

    const loadMovie = async () => {
      const movie = await getMovie(movieNum);

      const convertRoundToRoundTime = (roundNum) => {
        switch (roundNum) {
          case 1:
            setRoundTime(movie.roundTime1);
            break;
          case 2:
            setRoundTime(movie.roundTime2);
            break;
          case 3:
            setRoundTime(movie.roundTime3);
            break;
          case 4:
            setRoundTime(movie.roundTime4);
            break;
          case 5:
            setRoundTime(movie.roundTime5);
            break;
          default:
            console.error("잘못된 번호입니다.");
        }
      };

      convertRoundToRoundTime(roundNum);
      setMovie(movie);
    };

    loadMovie();
  }, [movieNum, roundNum, orderId]);

  // 좌석 정보를 배열로 묶어서 필터링
  const seatNumbers = [
    seatNum1,
    seatNum2,
    seatNum3,
    seatNum4,
    seatNum5,
    seatNum6,
  ].filter(Boolean);

  // 인원별 타입과 수 계산
  const personCount = [
    rpersonType1,
    rpersonType2,
    rpersonType3,
    rpersonType4,
    rpersonType5,
    rpersonType6,
  ]
    .filter(Boolean) // null 또는 undefined 제거
    .reduce((acc, type) => {
      if (acc[type]) {
        acc[type] += 1; // 동일 타입이 있으면 개수 증가
      } else {
        acc[type] = 1; // 처음 등장하는 타입이면 1로 설정
      }
      return acc;
    }, {});

  // 결과를 배열로 변환하여 출력
  const personDetails = Object.entries(personCount)
    .map(([type, count]) => `${type} ${count}`)
    .join(" · ");

  return (
    <div className="mt-9 flex items-center justify-center">
      <div className="rounded border bg-gray-100 px-20 py-10 text-primary">
        <h2 className="mb-10 text-center text-2xl font-bold">
          예매가 완료되었습니다.
        </h2>
        <div className="flex gap-12">
          <div className="h-full w-[170px]">
            {movie.posterUrl && (
              <img
                src={`http://localhost:8080/api/admin/movie/view/${movie.posterUrl}`}
                alt={`${movie.korTitle} 포스터 이미지`}
                className="h-full w-full"
              />
            )}
          </div>
          <div className="flex">
            <div className="mr-12 flex flex-col gap-2 font-semibold">
              <div>예매 번호</div>
              <div>영화 제목</div>
              <div>상영관</div>
              <div>관람일시</div>
              <div>인원</div>
              <div>좌석 번호</div>
              <div>결제 금액</div>
              <div>결제일</div>
            </div>

            <div className="flex flex-col gap-2">
              <div>{rnum}</div>
              <div className="flex items-center">
                {movie.rating === "전체" ? (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-green-600 text-sm font-medium text-white">
                    All
                  </div>
                ) : movie.rating === "12" ? (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-yellow-500 text-sm font-medium text-white">
                    12
                  </div>
                ) : movie.rating === "15" ? (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-orange-600 text-sm font-medium text-white">
                    15
                  </div>
                ) : (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-red-600 text-sm font-medium text-white">
                    19
                  </div>
                )}
                {movie.korTitle}
              </div>
              <div>{theaterNum === 0 ? "일반관" : "커플관"}</div>
              <div>
                {reserveDate} {roundTime} ({roundNum}회차)
              </div>
              <div>{personDetails}</div>
              <div>{seatNumbers.join(", ")}</div>
              <div>{paymentAmount.toLocaleString()}원</div>
              <div>{new Date(regDate).toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          <Link
            to={"/mypage/reserve"}
            className="rounded border bg-primary px-6 py-3 text-white"
          >
            예매확인 / 예매취소
          </Link>
        </div>
      </div>
    </div>
  );
}
