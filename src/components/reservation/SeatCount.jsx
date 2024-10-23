import React, { useEffect } from "react";

export default function SeatCount({
  selectedMovie,
  adultCount,
  teenCount,
  specialCount,
  setAdultCount,
  setTeenCount,
  setSpecialCount,
  handlePeopleChange,
}) {
  // 총인원
  const totalTickets = adultCount + teenCount + specialCount;

  useEffect(() => {
    handlePeopleChange(totalTickets);
  }, [totalTickets, handlePeopleChange]);

  // 인원 증가 핸들러
  const handleIncrease = (setter, count) => {
    if (totalTickets < 6) {
      setter(count + 1);
    } else {
      alert("선택 가능한 인원은 최대 6명입니다.");
    }
  };

  // 인원 감소 핸들러
  const handleDecrease = (setter, count) => {
    if (count > 0) {
      setter(count - 1);
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    setAdultCount(0);
    setTeenCount(0);
    setSpecialCount(0);
  };

  return (
    <div className="mb-4 rounded bg-gray-100 px-4 py-6 text-center text-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* 성인 카운터 */}
          <div className="flex items-center">
            <span className="mr-2">성인</span>
            <button
              onClick={() => handleDecrease(setAdultCount, adultCount)}
              className="rounded-l bg-gray-300 px-3 py-1 text-gray-700"
            >
              -
            </button>
            <span className="mx-3">{adultCount}</span>
            <button
              onClick={() => handleIncrease(setAdultCount, adultCount)}
              className="rounded-r bg-tertiary px-3 py-1 text-white"
            >
              +
            </button>
          </div>

          {/* 청소년 카운터 */}
          {selectedMovie.rating !== "19" ? (
            <div className="flex items-center">
              <span className="mr-2">청소년</span>
              <button
                onClick={() => handleDecrease(setTeenCount, teenCount)}
                className="rounded-l bg-gray-300 px-3 py-1 text-gray-700"
              >
                -
              </button>
              <span className="mx-3">{teenCount}</span>
              <button
                onClick={() => handleIncrease(setTeenCount, teenCount)}
                className="rounded-r bg-tertiary px-3 py-1 text-white"
              >
                +
              </button>
            </div>
          ) : (
            ""
          )}

          {/* 우대 카운터 */}
          <div className="flex items-center">
            <span className="mr-2">우대</span>
            <button
              onClick={() => handleDecrease(setSpecialCount, specialCount)}
              className="rounded-l bg-gray-300 px-3 py-1 text-gray-700"
            >
              -
            </button>
            <span className="mx-3">{specialCount}</span>
            <button
              onClick={() => handleIncrease(setSpecialCount, specialCount)}
              className="rounded-r bg-tertiary px-3 py-1 text-white"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="font-medium">
            총 선택 인원: <span>{totalTickets}</span>
          </div>

          {/* 초기화 버튼 */}
          <button
            onClick={handleReset}
            className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary-hover"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
