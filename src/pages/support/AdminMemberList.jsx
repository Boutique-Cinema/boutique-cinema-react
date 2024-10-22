import React, { useEffect, useState } from "react";
import { getAllMembers } from "../../api/membersApi";

const AdminMemberPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [treatedStatus, setTreatedStatus] = useState({});
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getAllMembers();
        setMembers(response.content || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleTreatedChange = (id, value) => {
    setTreatedStatus((prev) => ({ ...prev, [id]: value }));
    // 여기에 API 호출 로직 추가
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-4xl font-bold">회원 목록</h1>
      <table className="min-w-full border border-gray-700 bg-gray-800">
        <thead className="bg-gray-700 text-white">
          <tr>
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
              <td className="px-6 py-3">{member.name}</td>
              <td className="px-6 py-3">{member.email}</td>
              <td className="px-6 py-3">{member.phone}</td>
              <td className="px-6 py-3">{member.birth}</td>
              <td className="px-6 py-3">{member.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMemberPage;
