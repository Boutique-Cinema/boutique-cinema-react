import React, { useState } from "react";

export default function AdminReservationList() {
  const [bookings, setBookings] = useState([
    {
      bookingId: 1,
      memberId: "jinwoo",
      memberName: "장진우",
      movieTitle: "베테랑2",
      showTime: "2024-09-20 15:00",
      screen: "상영관A",
      seatNumber: "A1",
      personCount: 1,
      isRefunded: false,
      bookingDate: "2023-09-15",
    },
    {
      bookingId: 2,
      memberId: "jooo12",
      memberName: "조천훈",
      movieTitle: "베테랑2",
      showTime: "2024-09-20 15:00",
      screen: "상영관B",
      seatNumber: "A9",
      personCount: 3,
      isRefunded: false,
      bookingDate: "2023-09-15",
    },
  ]);

  const selectList = [
    { value: "memberId", name: "회원아이디" },
    { value: "screen", name: "상영관" },
    { value: "memberName", name: "회원이름" },
    { value: "seatNumber", name: "좌석번호" },
  ];

  const [selected, setSelected] = useState(selectList[0].value); // 기본값
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefund = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, isRefunded: true }
          : booking
      )
    );
  };

  // 검색 필터링
  const filteredBookings = bookings.filter((booking) => {
    return booking[selected]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>회원 예매 리스트</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <select
          onChange={handleSelect}
          value={selected}
          style={{ marginRight: "10px" }}
        >
          {selectList.map((item) => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "5px" }}
        />
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>회원 아이디</th>
            <th style={thStyle}>이름</th>
            <th style={thStyle}>영화 제목</th>
            <th style={thStyle}>상영시간/날짜</th>
            <th style={thStyle}>상영관</th>
            <th style={thStyle}>좌석번호</th>
            <th style={thStyle}>예매 번호</th>
            <th style={thStyle}>인원수</th>
            <th style={thStyle}>취소/환불 여부</th>
            <th style={thStyle}>예매 날짜</th>
            <th style={thStyle}>취소</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.bookingId} style={{ cursor: "pointer" }}>
              <td style={thTdStyle}>{booking.memberId}</td>
              <td style={thTdStyle}>{booking.memberName}</td>
              <td style={thTdStyle}>{booking.movieTitle}</td>
              <td style={thTdStyle}>{booking.showTime}</td>
              <td style={thTdStyle}>{booking.screen}</td>
              <td style={thTdStyle}>{booking.seatNumber}</td>
              <td style={thTdStyle}>{booking.bookingId}</td>
              <td style={thTdStyle}>{booking.personCount}</td>
              <td style={thTdStyle}>
                {booking.isRefunded ? "환불 완료" : "환불 불가"}
              </td>
              <td style={thTdStyle}>{booking.bookingDate}</td>
              <td style={thTdStyle}>
                {!booking.isRefunded && (
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRefund(booking.bookingId)}
                  >
                    환불
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
