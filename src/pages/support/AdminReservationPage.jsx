import React, { useEffect, useState } from "react";
import {
  getAllReservations,
  getReservationsById,
  cancelReservation,
} from "../../api/reservationApi";

const AdminReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberId, setMemberId] = useState(""); // 회원 ID 상태 추가
  const [isSearching, setIsSearching] = useState(false); // 검색 상태 추가

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (rnum) => {
    try {
      await cancelReservation(rnum);
      setReservations((prev) =>
        prev.filter((reservation) => reservation.rnum !== rnum),
      );
      alert("예매가 취소되었습니다.");
    } catch (error) {
      console.error("예매 취소 중 오류 발생:", error);
      alert("예매 취소에 실패했습니다.");
    }
  };

  const handleSearch = async () => {
    if (!memberId) return;

    setLoading(true);
    setIsSearching(true);
    setError(null);

    console.log("Searching for member ID:", memberId); // 디버깅 로그 추가

    try {
      const response = await getReservationsById(memberId);
      setReservations(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-4xl font-bold">예매 목록</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="회원 ID 입력"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="mr-2 rounded border border-gray-300 p-2 text-black" // 텍스트 색상 추가
          style={{ backgroundColor: "white" }} // 배경색 설정
        />
        <button
          onClick={handleSearch}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          검색
        </button>
      </div>

      <table className="min-w-full border border-gray-700 bg-gray-800">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left">예매 번호</th>
            <th className="px-6 py-3 text-left">회원 ID</th>
            <th className="px-6 py-3 text-left">상영관 번호</th>
            <th className="px-6 py-3 text-left">상영 회차</th>
            <th className="px-6 py-3 text-left">결제 금액</th>
            <th className="px-6 py-3 text-left">예매 날짜</th>
            <th className="px-6 py-3 text-left">좌석 번호</th>
            <th className="px-6 py-3 text-left">예매 취소</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-300">
          {reservations.map((reservation, index) => (
            <tr
              key={index}
              className="border-b border-gray-600 hover:bg-gray-600"
            >
              <td className="px-6 py-3">{reservation.rnum}</td>
              <td className="px-6 py-3">{reservation.mid}</td>
              <td className="px-6 py-3">{reservation.theaterNum}</td>
              <td className="px-6 py-3">{reservation.roundNum}</td>
              <td className="px-6 py-3">{reservation.paymentAmount}</td>
              <td className="px-6 py-3">{reservation.reserveDate}</td>
              <td className="px-6 py-3">{reservation.seatNum1}</td>
              <td className="px-6 py-3">
                <button
                  onClick={() => handleCancel(reservation.rnum)}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isSearching && (
        <button
          onClick={() => {
            setMemberId("mid");
            setIsSearching(false);
          }} // 검색 초기화
          className="mt-4 text-blue-500"
        >
          검색 초기화
        </button>
      )}
    </div>
  );
};

export default AdminReservationPage;
