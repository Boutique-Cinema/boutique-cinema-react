import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600">
          페이지를 찾을 수 없음
        </h1>
        <p className="mt-4 text-gray-700">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <button
          className="mt-6 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          onClick={() => window.history.back()}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
