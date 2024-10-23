import React, { useCallback, useEffect, useState } from "react";
import SeatCount from "../../components/reservation/SeatCount";
import SeatTable from "../../components/reservation/SeatTable";
import ReservationResult from "../../components/reservation/ReservationResult";
import { useLocation } from "react-router-dom";
import { getMovie } from "../../api/movieApi";
import MovieRatingModal from "../../components/reservation/MovieRatingModal";

export default function ReservationSeatPage() {
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState({});
  const [totalTickets, setTotalTickets] = useState(0);
  const [resetSeats, setResetSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adultCount, setAdultCount] = useState(0);
  const [teenCount, setTeenCount] = useState(0);
  const [specialCount, setSpecialCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const selectedMovie = location.state || {};
    if (!selectedMovie.movieNum) return;

    const loadMovie = async () => {
      const data = await getMovie(selectedMovie.movieNum);
      setSelectedMovie(data);

      if (data.rating === "19") {
        setShowModal(true);
      }
    };

    loadMovie();
  }, [location]);

  // 인원수를 변경할 때 좌석을 초기화
  const handlePeopleChange = useCallback((newPeople) => {
    setTotalTickets(newPeople);
    setResetSeats((prev) => !prev); // 좌석 선택 초기화
  }, []);

  const handleSeatSelect = useCallback((seats) => {
    setSelectedSeats(seats);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex">
      <div className="w-2/3">
        {/* 인원 선택 컴포넌트 */}
        <SeatCount
          selectedMovie={selectedMovie}
          adultCount={adultCount}
          teenCount={teenCount}
          specialCount={specialCount}
          setAdultCount={setAdultCount}
          setTeenCount={setTeenCount}
          setSpecialCount={setSpecialCount}
          handlePeopleChange={handlePeopleChange}
        />
        {/* 좌석표 컴포넌트 */}
        <SeatTable
          maxSeats={totalTickets}
          resetSeats={resetSeats}
          selectedSeats={selectedSeats}
          selectedMovie={selectedMovie}
          onSeatSelect={handleSeatSelect}
        />
      </div>
      <div className="ml-4 w-1/3">
        {/* 예매 정보 안내 컴포넌트 */}
        <ReservationResult
          adultCount={adultCount}
          teenCount={teenCount}
          specialCount={specialCount}
          selectedSeats={selectedSeats}
          selectedMovie={selectedMovie}
        />
      </div>

      {/* 19금 안내 모달 */}
      <MovieRatingModal show={showModal} onClose={closeModal} />
    </div>
  );
}
