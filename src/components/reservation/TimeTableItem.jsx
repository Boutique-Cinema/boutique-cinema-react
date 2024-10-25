import React, { useEffect, useState } from "react";
import { TbMovieOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { addMinutesToTime } from "../../util/dateFormatUtil";
import { getAllReservations } from "../../api/reservationApi";
import useCustomLogin from "../../hook/useCustomLogin";

export default function TimeTableItem({ date, selectedMovies, activeTab }) {
  const navigate = useNavigate();
  const { exceptionHandle } = useCustomLogin();
  const [reservations, setReservations] = useState([]);

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

  // 상영관선택에 따른 영화 필터링
  const selectedMovie = selectedMovies.filter(
    (movie) => movie.theaterNum === activeTab,
  )[0];

  // 잔여석 계산 함수
  const getAvailableSeats = (date, movieNum, roundNum, theaterNum) => {
    // 해당 상영 회차에 해당하는 예약 데이터 필터링
    const filteredReservations = reservations.filter(
      (res) =>
        res.reserveDate === date &&
        res.movieNum === movieNum &&
        res.roundNum === roundNum &&
        res.theaterNum === theaterNum &&
        res.isCanceled !== 1,
    );

    // 예약된 좌석 수 계산
    let reservedSeats = 0;
    filteredReservations.forEach((res) => {
      if (res.seatNum1) reservedSeats += 1;
      if (res.seatNum2) reservedSeats += 1;
      if (res.seatNum3) reservedSeats += 1;
      if (res.seatNum4) reservedSeats += 1;
      if (res.seatNum5) reservedSeats += 1;
      if (res.seatNum6) reservedSeats += 1;
    });

    // 전체 좌석 수 설정 (일반관 60석, 커플관 36석)
    const totalSeats = theaterNum === 0 ? 60 : 36;

    // 잔여석 계산
    return totalSeats - reservedSeats;
  };

  // 현재 시간과 상영 시간을 비교하여 회차 비활성화 여부를 결정
  const isRoundDisabled = (roundTime) => {
    const currentTime = new Date(); // 현재 시간
    const selectedDateTime = new Date(date + "T" + roundTime); // 상영 시간 (예: '2024-10-24T14:00')

    // 현재 날짜가 오늘이고, 상영 시간이 현재 시간보다 이전일 때 비활성화
    return (
      date === currentTime.toISOString().split("T")[0] &&
      selectedDateTime <= currentTime
    );
  };

  // 상영 시간 선택 핸들러
  const handleClickTime = (roundNum, roundTime) => {
    if (
      getAvailableSeats(
        selectedMovie.movieNum,
        roundNum,
        selectedMovie.theaterNum,
      ) === 0
    ) {
      alert("잔여석이 없습니다. 다른 회차를 예매해주세요.");
      return;
    }

    if (isRoundDisabled(roundTime)) {
      alert("상영시간이 지난 회차입니다. 다른 회차를 예매해주세요.");
      return;
    }

    navigate(`/reserve/seat`, {
      state: {
        movieNum: selectedMovie.movieNum,
        date,
        theaterNum: selectedMovie.theaterNum,
        roundNum,
      },
    });
  };

  return (
    <>
      {selectedMovie ? (
        // 상영 회차별 목록(1 ~ 5회차)
        <ul className="flex flex-wrap gap-10 p-16">
          {selectedMovie.round1 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(1, selectedMovie.roundTime1)}
            >
              <div className="space-y-2">
                <div className="text-base">1회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime1,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">{`잔여석 ${getAvailableSeats(
                  date,
                  selectedMovie.movieNum,
                  1,
                  selectedMovie.theaterNum,
                )}/${selectedMovie.theaterNum === 0 ? "60" : "36"}`}</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round2 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(2, selectedMovie.roundTime2)}
            >
              <div className="space-y-2">
                <div className="text-base">2회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime2,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">{`잔여석 ${getAvailableSeats(
                  date,
                  selectedMovie.movieNum,
                  2,
                  selectedMovie.theaterNum,
                )}/${selectedMovie.theaterNum === 0 ? "60" : "36"}`}</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round3 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(3, selectedMovie.roundTime3)}
            >
              <div className="space-y-2">
                <div className="text-base">3회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime3,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">{`잔여석 ${getAvailableSeats(
                  date,
                  selectedMovie.movieNum,
                  3,
                  selectedMovie.theaterNum,
                )}/${selectedMovie.theaterNum === 0 ? "60" : "36"}`}</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round4 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(4, selectedMovie.roundTime4)}
            >
              <div className="space-y-2">
                <div className="text-base">4회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime4,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">{`잔여석 ${getAvailableSeats(
                  date,
                  selectedMovie.movieNum,
                  4,
                  selectedMovie.theaterNum,
                )}/${selectedMovie.theaterNum === 0 ? "60" : "36"}`}</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round5 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(5, selectedMovie.roundTime5)}
            >
              <div className="space-y-2">
                <div className="text-base">5회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime5,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">{`잔여석 ${getAvailableSeats(
                  date,
                  selectedMovie.movieNum,
                  5,
                  selectedMovie.theaterNum,
                )}/${selectedMovie.theaterNum === 0 ? "60" : "36"}`}</div>
              </div>
            </li>
          ) : (
            ""
          )}
        </ul>
      ) : (
        // 빈(empty) 목록 안내
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <TbMovieOff className="h-20 w-20 text-gray-100" />
          <span className="text-xl">
            날짜와 영화를 선택하시면 상영시간표를 볼 수 있습니다.
          </span>
        </div>
      )}
    </>
  );
}
