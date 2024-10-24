import React from "react";
import Nav from "./Nav";
import Search from "../common/Search";
import Logo from "../common/Logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/loginSlice";

export default function MemberHeader() {
  const loginState = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <header className="relative w-full pt-3">
      <h1 className="sr-only">Boutique Cinema</h1>
      <div>
        <h2 className="sr-only">고객 서비스</h2>
        <ul className="mb-8 flex justify-end gap-4 text-sm">
          {!loginState.id ? (
            <li className="hover:text-red-300">
              <Link to="/member/login">로그인</Link>
            </li>
          ) : (
            <li className="hover:text-red-300">
              <button onClick={handleClickLogout}>로그아웃</button>
            </li>
          )}
          {!loginState.id ? (
            <li className="hover:text-red-300">
              <Link to="/member/join">회원가입</Link>
            </li>
          ) : loginState.id === "admin" ? (
            <li className="hover:text-red-300">
              <Link to="/admin/movie/list">관리자페이지</Link>
            </li>
          ) : (
            <li className="hover:text-red-300">
              <Link to="/mypage/reserve">마이페이지</Link>
            </li>
          )}
          <li className="hover:text-red-300">
            <Link to="/support">고객센터</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-end justify-between">
        <a href="/" className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <Logo />
        </a>
        <Nav />
        <Search />
      </div>
    </header>
  );
}
