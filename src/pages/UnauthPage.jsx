import React from "react";

export default function UnauthPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-red-600">잘못된 접근</h1>
        <p className="mt-4 text-gray-700">
          이 페이지에 접근할 수 있는 권한이 없습니다.
        </p>
        <button
          className="mt-6 rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          onClick={() => window.history.back()}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
