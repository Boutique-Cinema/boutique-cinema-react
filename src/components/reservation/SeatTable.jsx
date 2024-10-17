import React, { useCallback, useEffect, useState } from "react";
import { RxExit, RxEnter } from "react-icons/rx";

export default function SeatTable({
  maxSeats,
  resetSeats,
  selectedSeats,
  onSeatSelect,
}) {
  const ROWS = 6; // 행 수
  const COLUMNS = 10; // 열 수
  const [hoveredSeat, setHoveredSeat] = useState(null);

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

      // 현재 선택된 좌석이 포함되어 있는지 확인
      const isSeatSelected = selectedSeats.includes(seat);

      if (isSeatSelected) {
        // 선택 해제
        const newSelectedSeats = selectedSeats.filter((s) => s !== seat);
        onSeatSelect(newSelectedSeats); // 상위 컴포넌트에 업데이트
      } else {
        // 새로운 좌석 선택
        if (selectedSeats.length < maxSeats) {
          const newSelectedSeats = [...selectedSeats, seat];
          onSeatSelect(newSelectedSeats); // 상위 컴포넌트에 업데이트
        } else {
          alert(`최대 ${maxSeats}개의 좌석을 선택할 수 있습니다.`);
        }
      }
    },
    [maxSeats, selectedSeats, onSeatSelect],
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

    for (let row = 0; row < ROWS; row++) {
      const seatRow = [];

      for (let col = 0; col < COLUMNS; col++) {
        const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;

        seatRow.push(
          <button
            key={seatNumber}
            onClick={() => handleSeatClick(seatNumber)}
            onMouseEnter={() => handleMouseEnter(seatNumber)} // Hover 시작
            onMouseLeave={handleMouseLeave} // Hover 종료
            className={`m-1 h-10 w-10 rounded ${
              selectedSeats.includes(seatNumber)
                ? "bg-secondary text-white" // 선택된 좌석 스타일
                : hoveredSeat === seatNumber
                  ? "bg-secondary" // Hover 상태일 때 스타일
                  : "bg-gray-300" // 기본 좌석 스타일
            }`}
          >
            {col + 1}
          </button>,
        );
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
    <div className="flex flex-col items-center justify-center rounded bg-gray-100 p-[26px]">
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
