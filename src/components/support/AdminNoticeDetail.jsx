import React from "react";
import { useParams } from "react-router-dom";

export default function AdminNoticeDetail() {
  const { id } = useParams();

  return (
    <div className="rounded bg-black p-4 shadow">
      <h2 className="text-2xl font-bold">공지사항 제목 {id}</h2>
      <p className="mt-2">공지사항 내용이 여기에 표시됩니다.</p>
    </div>
  );
}
