import React, { useEffect, useState } from "react";
import { getAllMembers, getMembersByCondition } from "../../../api/membersApi";

const AdminMemberPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchCondition, setSearchCondition] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = searchCondition
          ? await getMembersByCondition(searchCondition, currentPage)
          : await getAllMembers(currentPage);

        setMembers(response.content || []);
        setTotalPages(response.totalPages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [currentPage, searchCondition]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchCondition(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-4xl font-bold">회원 목록</h1>

      <input
        type="text"
        placeholder="Name or E-mail"
        value={searchCondition}
        onChange={handleSearch}
        className="mb-4 border bg-gray-800 p-2 text-white placeholder-gray-500"
      />

      <table className="min-w-full border border-gray-700 bg-gray-800">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left">아이디</th> {/* 아이디 추가 */}
            <th className="px-6 py-3 text-left">이름</th>
            <th className="px-6 py-3 text-left">이메일</th>
            <th className="px-6 py-3 text-left">전화번호</th>
            <th className="px-6 py-3 text-left">생일</th>
            <th className="px-6 py-3 text-left">가입 날짜</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-300">
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-gray-600 hover:bg-gray-600"
            >
              <td className="px-6 py-3">{member.id}</td> {/* 아이디 출력 */}
              <td className="px-6 py-3">{member.name}</td>
              <td className="px-6 py-3">{member.email}</td>
              <td className="px-6 py-3">{member.phone}</td>
              <td className="px-6 py-3">{member.birth}</td>
              <td className="px-6 py-3">{member.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 px-4 py-2 text-white"
        >
          이전
        </button>
        <span>
          페이지 {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 px-4 py-2 text-white"
        >
          다음
        </button>
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminMemberPage;
