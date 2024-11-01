import React from "react";

export default function CoupleModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center rounded bg-gray-100 p-6 text-primary">
        <h2 className="mb-5 text-lg font-semibold">안내</h2>
        <p>커플관에서는 두 좌석씩 선택해야 합니다.</p>
        <button
          onClick={onClose}
          className="mt-10 rounded bg-secondary px-6 py-2 text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
