import React from "react";

export default function MovieRatingModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-md rounded-lg bg-gray-100 p-6 text-center text-primary shadow-lg">
        <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-bold text-red-600">
          <div className="rounded bg-red-600 px-1 py-0.5 text-white">19</div>
          <span>청소년관람불가</span>
        </h2>
        <p className="mb-2">입장 시, 신분증을 반드시 지참해주세요!</p>
        <p className="mb-6">
          만 19세 미만의 고객님은(영,유아포함) 보호자를 동반하여도 관람이
          불가합니다.
        </p>
        <button
          onClick={onClose}
          className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary-hover"
        >
          확인
        </button>
      </div>
    </div>
  );
}
