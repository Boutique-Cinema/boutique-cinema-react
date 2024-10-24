import React, { useCallback, useEffect, useState } from "react";
import { RxExit, RxEnter } from "react-icons/rx";
import { getAllReservations } from "../../api/reservationApi";
import useCustomLogin from "./../../hook/useCustomLogin";
import { useLocation } from "react-router-dom";

export default function SeatTable({
  maxSeats,
  resetSeats,
  selectedSeats,
  onSeatSelect,
}) {
  const location = useLocation();
  const { exceptionHandle } = useCustomLogin();
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [reservations, setReservations] = useState([]);
  const { movieNum, date, theaterNum, roundNum } = location.state || {};

  const reservedSeats = reservations
    .filter(
      (reservation) =>
        reservation.reserveDate === date &&
        reservation.movieNum === movieNum &&
        reservation.theaterNum === theaterNum &&
        reservation.roundNum === roundNum &&
        reservation.isCanceled !== 1,
    )
    .flatMap((reservation) => {
      const { seatNum1, seatNum2, seatNum3, seatNum4, seatNum5, seatNum6 } =
        reservation;
      return [
        seatNum1,
        seatNum2,
        seatNum3,
        seatNum4,
        seatNum5,
        seatNum6,
      ].filter(Boolean);
    });

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await getAllReservations();
        setReservations(data);
      } catch (err) {
        exceptionHandle(err);
      }
    };

    loadReservations();
  }, [exceptionHandle]);

  // 인원수가 바뀌면 좌석 선택을 초기화
  useEffect(() => {
    setHoveredSeat(null);
    onSeatSelect([]);
  }, [resetSeats, onSeatSelect]);

  // 좌석 클릭 핸들러
  const handleSeatClick = useCallback(
    (seat) => {
      if (maxSeats === 0) {
        alert("인원 선택을 먼저 해주세요.");
        return;
      }

      // 커플관에서는 홀수 인원 선택 불가
      if (theaterNum === 1 && maxSeats % 2 !== 0) {
        alert("커플관에서는 짝수 인원만 선택할 수 있습니다.");
        return;
      }

      // 현재 좌석이 예약된 좌석인지 확인
      if (reservedSeats.includes(seat)) {
        alert("이미 예약된 좌석입니다.");
        return;
      }

      // 커플관 좌석 쌍 계산
      let pairedSeat;
      const seatNumber = parseInt(seat.slice(1)); // 좌석 번호 (예: A1의 경우 1)

      // 홀수일 때
      if (seatNumber % 2 === 1) {
        pairedSeat = seat.charAt(0) + (seatNumber + 1); // 홀수 -> 짝수
      }
      // 짝수일 때
      else {
        pairedSeat = seat.charAt(0) + (seatNumber - 1); // 짝수 -> 홀수
      }

      // 현재 선택된 좌석이 포함되어 있는지 확인
      const isSeatSelected = selectedSeats.includes(seat);
      const isPairedSeatSelected = selectedSeats.includes(pairedSeat); // 쌍 좌석 선택 여부 확인

      if (theaterNum === 1) {
        if (isSeatSelected || isPairedSeatSelected) {
          // 선택 해제: 선택된 좌석 또는 쌍 좌석 제거
          const newSelectedSeats = selectedSeats.filter(
            (s) => s !== seat && s !== pairedSeat,
          );

          onSeatSelect(sortSeats(newSelectedSeats));
        } else {
          // 새로운 좌석 선택
          if (selectedSeats.length < maxSeats - 1) {
            const newSelectedSeats = [...selectedSeats, seat, pairedSeat]; // 쌍 좌석 추가

            onSeatSelect(sortSeats(newSelectedSeats));
          } else {
            alert(`최대 ${maxSeats}개의 좌석을 선택할 수 있습니다.`);
          }
        }
      } else {
        // 일반관에서의 좌석 선택 처리
        if (isSeatSelected) {
          // 선택 해제
          const newSelectedSeats = selectedSeats.filter((s) => s !== seat);

          onSeatSelect(sortSeats(newSelectedSeats));
        } else {
          // 새로운 좌석 선택
          if (selectedSeats.length < maxSeats) {
            const newSelectedSeats = [...selectedSeats, seat];

            onSeatSelect(sortSeats(newSelectedSeats));
          } else {
            alert(`최대 ${maxSeats}개의 좌석을 선택할 수 있습니다.`);
          }
        }
      }
    },
    [maxSeats, reservedSeats, selectedSeats, onSeatSelect, theaterNum],
  );

  // hover 상태 설정
  const handleMouseEnter = (seat) => {
    setHoveredSeat(seat);
  };

  const handleMouseLeave = () => {
    setHoveredSeat(null);
  };

  // 좌석을 2차원 배열로 생성
  const renderSeats = () => {
    const seats = [];
    const ROWS = 6; // 행 수
    const COLUMNS = theaterNum === 1 ? 3 : 10; // 커플관일 때는 열을 3으로 설정, 일반관은 10

    for (let row = 0; row < ROWS; row++) {
      const seatRow = [];

      for (let col = 0; col < COLUMNS; col++) {
        // 커플관일 때 두 좌석씩 묶어서 배치
        const seatNumber1 = `${String.fromCharCode(65 + row)}${col * 2 + 1}`; // 첫 번째 좌석
        const seatNumber2 = `${String.fromCharCode(65 + row)}${col * 2 + 2}`; // 두 번째 좌석

        if (theaterNum === 1) {
          seatRow.push(
            <div key={`pair-${col}`} className="mr-4 flex items-center">
              <button
                onClick={() => handleSeatClick(seatNumber1)}
                onMouseEnter={() => handleMouseEnter(seatNumber1)} // Hover 시작
                onMouseLeave={handleMouseLeave} // Hover 종료
                disabled={reservedSeats.includes(seatNumber1)} // 예약된 좌석이면 버튼 비활성화
                className={`m-1 h-10 w-10 rounded ${
                  reservedSeats.includes(seatNumber1)
                    ? "cursor-not-allowed bg-tertiary text-white"
                    : selectedSeats.includes(seatNumber1)
                      ? "bg-secondary text-white"
                      : hoveredSeat === seatNumber1
                        ? "bg-secondary"
                        : "bg-gray-300"
                }`}
              >
                {col * 2 + 1}
              </button>
              <button
                onClick={() => handleSeatClick(seatNumber2)}
                onMouseEnter={() => handleMouseEnter(seatNumber2)} // Hover 시작
                onMouseLeave={handleMouseLeave} // Hover 종료
                disabled={reservedSeats.includes(seatNumber2)} // 예약된 좌석이면 버튼 비활성화
                className={`m-1 h-10 w-10 rounded ${
                  reservedSeats.includes(seatNumber2)
                    ? "cursor-not-allowed bg-tertiary text-white"
                    : selectedSeats.includes(seatNumber2)
                      ? "bg-secondary text-white"
                      : hoveredSeat === seatNumber2
                        ? "bg-secondary"
                        : "bg-gray-300"
                }`}
              >
                {col * 2 + 2}
              </button>
            </div>,
          );
        } else {
          // 일반관일 때는 좌석을 연속적으로 배치
          const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
          seatRow.push(
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              onMouseEnter={() => handleMouseEnter(seatNumber)} // Hover 시작
              onMouseLeave={handleMouseLeave} // Hover 종료
              disabled={reservedSeats.includes(seatNumber)} // 예약된 좌석이면 버튼 비활성화
              className={`m-1 h-10 w-10 rounded ${
                reservedSeats.includes(seatNumber)
                  ? "cursor-not-allowed bg-tertiary text-white"
                  : selectedSeats.includes(seatNumber)
                    ? "bg-secondary text-white"
                    : hoveredSeat === seatNumber
                      ? "bg-secondary"
                      : "bg-gray-300"
              }`}
            >
              {col + 1}
            </button>,
          );
        }
      }

      seats.push(
        <div key={row} className="flex items-center">
          {/* 왼쪽에 열 알파벳 표시 */}
          <span className="mr-4 text-primary">
            {String.fromCharCode(65 + row)}
          </span>
          {seatRow}
        </div>,
      );
    }
    return seats;
  };

  return (
    <div className="flex flex-col items-center justify-center rounded bg-gray-100 p-[32px] px-5">
      <div className="text-xl font-semibold text-primary">SCREEN</div>
      <div className="flex w-full items-end justify-between p-4">
        {/* 입구 아이콘 */}
        <RxExit className="-rotate-90 text-3xl text-gray-500" />
        {/* 좌석표 */}
        <div>{renderSeats()}</div>
        {/* 출구 아이콘 */}
        <RxEnter className="rotate-90 text-3xl text-gray-500" />
      </div>
    </div>
  );
}

// 선택된 좌석 배열을 정렬하는 함수
const sortSeats = (seats) => {
  return seats.sort((a, b) => {
    const numA = parseInt(a.slice(1));
    const numB = parseInt(b.slice(1));
    return numA - numB; // 정렬 기준: 좌석 번호
  });
};
