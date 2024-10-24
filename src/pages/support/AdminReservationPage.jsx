import React, { useEffect, useState } from "react";
import { getAllReservations } from "../../api/reservationApi";

const AdminReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response.content || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-4xl font-bold">예매 목록</h1>
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
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-300">
          {reservations.map((reservation) => (
            <tr
              key={reservation.rNum}
              className="border-b border-gray-600 hover:bg-gray-600"
            >
              <td className="px-6 py-3">{reservation.rNum}</td>
              <td className="px-6 py-3">{reservation.memberId}</td>
              <td className="px-6 py-3">{reservation.theaterNum}</td>
              <td className="px-6 py-3">{reservation.roundNum}</td>
              <td className="px-6 py-3">{reservation.paymentAmount}</td>
              <td className="px-6 py-3">{reservation.reserveDate}</td>
              <td className="px-6 py-3">{reservation.seatNum1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservationPage;
