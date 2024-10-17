import React, { useEffect, useState } from "react";
import ReservationCalendar from "../../components/reservation/ReservationCalendar";
import ReservationMovieList from "./../../components/reservation/ReservationMovieList";
import TimeTable from "../../components/reservation/TimeTable";
import { getDateFormatted } from "../../util/dateFormatUtil";
import { fetchMoviesByDate } from "../../api/movieApi";

export default function ReservationTimePage() {
  const today = getDateFormatted(new Date());
  const [date, setDate] = useState(today);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  // 날짜 변경 핸들러
  const handleDateChange = (newDate) => {
    const date = getDateFormatted(newDate);
    setDate(date);
  };

  // 영화 선택 핸들러
  const handleMovieSelect = (movieTitle) => {
    setSelectedMovie(movieTitle);
  };

  useEffect(() => {
    if (!date) return; // 선택된 날짜가 없으면 요청을 보내지 않음

    const loadMovies = async () => {
      const data = await fetchMoviesByDate(date);
      setMovies(data);
    };

    loadMovies();
  }, [date]);

  return (
    <div className="mb-[100px] h-[70vh]">
      <h2 className="mb-5 text-2xl">예매</h2>
      <div className="flex h-full">
        <div className="h-full w-1/3">
          <div className="h-1/2">
            {/* 예매 날짜 선택 컴포넌트 */}
            <ReservationCalendar
              date={date}
              handleDateChange={handleDateChange}
            />
          </div>
          <div className="mt-4 h-1/2 pr-4">
            {/* 영화 목록 컴포넌트 */}
            <ReservationMovieList
              date={date}
              movies={movies}
              handleMovieSelect={handleMovieSelect}
            />
          </div>
        </div>
        <div className="h-full w-2/3">
          {/* 상영시간표 컴포넌트 */}
          <TimeTable
            date={date}
            movies={movies}
            selectedMovie={selectedMovie}
          />
        </div>
      </div>
    </div>
  );
}
