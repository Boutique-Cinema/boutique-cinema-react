import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_MENU = [
  { title: "영화관리", url: "admin/movie" },
  { title: "예매관리", url: "admin/reserve" },
  { title: "매출관리", url: "admin/sales" },
  { title: "회원관리", url: "admin/member" },
];

export default function AdminSidebar() {
  const [isHovering, setIsHovering] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="w-1/5 border-none bg-tertiary">
      <menu className="m-10 flex flex-col gap-7 text-lg">
        {NAV_MENU.map((item) => (
          <li key={crypto.randomUUID()}>
            <NavLink
              to={`/${item.url}`}
              className={({ isActive }) => {
                return isActive ? `font-medium text-red-200` : `text-white`;
              }}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
        <li>
          <div
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
          >
            <NavLink
              to={`/admin/support/notice`}
              className={({ isActive }) => {
                return isActive || pathname.includes("/support")
                  ? `font-medium text-red-200`
                  : `text-white`;
              }}
            >
              고객센터관리
            </NavLink>
            <ul
              className={`mt-2 overflow-hidden text-[15px] transition-all duration-300 ease-in-out`}
            >
              <li
                className={`mb-1 transition-opacity duration-500 ${
                  isHovering || pathname.includes("/support")
                    ? "opacity-100 delay-100"
                    : "opacity-0 delay-0"
                }`}
              >
                <NavLink
                  to={`/admin/support/notice`}
                  className={({ isActive }) => {
                    return isActive ? `font-medium text-red-200` : `text-white`;
                  }}
                >
                  공지사항 관리
                </NavLink>
              </li>
              <li
                className={`mb-1 transition-opacity duration-500 ${
                  isHovering || pathname.includes("/support")
                    ? "opacity-100 delay-300"
                    : "opacity-0 delay-0"
                }`}
              >
                <NavLink
                  to={`/admin/support/qna`}
                  className={({ isActive }) => {
                    return isActive ? `font-medium text-red-200` : `text-white`;
                  }}
                >
                  1:1 문의 관리
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </menu>
    </nav>
  );
}
