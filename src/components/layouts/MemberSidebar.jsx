import React from "react";
import { NavLink } from "react-router-dom";

const NAV_MENU = [
  { title: "예매 내역", url: "mypage/reserve" },
  { title: "취소/환불 내역", url: "mypage/cancel" },
  { title: "나의 관람평", url: "mypage/review" },
  { title: "1:1 문의", url: "mypage/qna" },
  { title: "회원정보 수정", url: "mypage/myinfo" },
];

export default function MemberSidebar() {
  return (
    <nav className="h-fit w-1/4 rounded-lg border-none bg-tertiary">
      <div className="w-full rounded-t-lg border-b border-none bg-secondary pb-2 pt-6">
        <div className="px-6 text-lg">
          안녕하세요. &nbsp;<strong>차지훈</strong>님
        </div>
        <div className="mt-5 flex justify-between px-2 text-[8px]">
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </div>
      </div>
      <menu className="m-10 flex flex-col gap-7 text-lg">
        {NAV_MENU.map((item) => (
          <li key={crypto.randomUUID()}>
            <NavLink
              to={`/${item.url}`}
              className={({ isActive }) => {
                return isActive
                  ? `text-xl font-bold text-red-200`
                  : `text-white`;
              }}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </menu>
    </nav>
  );
}
