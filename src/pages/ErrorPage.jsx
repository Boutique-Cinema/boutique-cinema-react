import React from "react";
import NotFoundPage from "./NotFoundPage";
import { useRouteError } from "react-router-dom";
import UnauthPage from "./UnauthPage";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // 상태 코드에 따라 분기 처리
  if (error.status === 403) {
    return <UnauthPage />; // 잘못된 접근 페이지
  }

  if (error.status === 404) {
    return <NotFoundPage />; // 찾을 수 없는 페이지
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-600">오류 발생!</h1>
        <p className="mt-4 text-gray-700">예기치 않은 오류가 발생했습니다.</p>
        <p className="mt-2 text-gray-500">
          <i>{error.statusText || error.message}</i>
        </p>
        <button
          className="mt-6 rounded bg-yellow-600 px-4 py-2 text-white transition hover:bg-yellow-700"
          onClick={() => window.history.back()}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
