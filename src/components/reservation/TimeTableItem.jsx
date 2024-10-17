import React from "react";
import { TbMovieOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { addMinutesToTime } from "../../util/dateFormatUtil";

export default function TimeTableItem({ date, selectedMovies, activeTab }) {
  const navigate = useNavigate();

  // 상영관선택에 따른 영화 필터링
  const selectedMovie = selectedMovies.filter(
    (movie) => movie.theaterNum === activeTab,
  )[0];

  // 상영 시간 선택 핸들러
  const handleClickTime = (roundNum) => {
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
              onClick={() => handleClickTime(1)}
            >
              <div className="space-y-2">
                <div className="text-base">1회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime1,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">잔여석 30/60</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round2 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(2)}
            >
              <div className="space-y-2">
                <div className="text-base">2회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime2,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">잔여석 30/60</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round3 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(3)}
            >
              <div className="space-y-2">
                <div className="text-base">3회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime3,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">잔여석 30/60</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round4 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(4)}
            >
              <div className="space-y-2">
                <div className="text-base">4회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime4,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">잔여석 30/60</div>
              </div>
            </li>
          ) : (
            ""
          )}
          {selectedMovie.round5 ? (
            <li
              className="w-fit cursor-pointer rounded bg-gray-100 p-3 text-lg text-tertiary hover:bg-gray-300"
              onClick={() => handleClickTime(5)}
            >
              <div className="space-y-2">
                <div className="text-base">5회차</div>
                <div className="font-medium text-black">
                  {addMinutesToTime(
                    selectedMovie.roundTime5,
                    selectedMovie.runTime,
                  )}
                </div>
                <div className="text-base text-green-700">잔여석 30/60</div>
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
