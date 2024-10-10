import React from "react";
import { NavLink } from "react-router-dom";

const NAV_MENU = [
  { title: "공지사항", url: "support/notice" },
  { title: "1:1문의", url: "support/qna" },
  <li>고객센터 운영시간 09:00~18:00</li>,
];

export default function MemberSidebar() {
  return (
    <nav
      style={{ marginTop: "8.8rem" }}
      className="h-[590px] w-2/12 rounded-lg border-none bg-tertiary"
    >
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
