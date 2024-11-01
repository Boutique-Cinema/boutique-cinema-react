import React from "react";

export default function RefundModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-gray-100 p-5 text-primary shadow-lg">
        <h2 className="mb-4 text-lg font-bold">환불 규정</h2>
        <p>- 영화 시작 20분 전까지: 요금 전액 환급.</p>
        <p>- 영화 시작 20분 전부터 영화 상영 전까지: 입장권 요금의 50% 환급.</p>
        <p>- 영화 시작 후에는 환급 요청 불가.</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="rounded bg-tertiary p-2 text-white hover:bg-tertiary-hover"
          >
            예매취소
          </button>
          <button
            onClick={onClose}
            className="rounded bg-secondary p-2 text-white hover:bg-secondary-hover"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
