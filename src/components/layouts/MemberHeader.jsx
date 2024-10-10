import React from "react";
import Nav from "./Nav";
import Search from "../common/Search";
import Logo from "../common/Logo";
import { Link } from "react-router-dom";

const HEADER_MENU = [
  { title: "로그인", url: "/member/login" },
  { title: "회원가입", url: "/member/join" },
  { title: "고객센터", url: "/support" },
];

export default function MemberHeader() {
  return (
    <header className="relative w-full pt-3">
      <h1 className="sr-only">Boutique Cinema</h1>
      <ul className="mb-8 flex justify-end gap-4 text-sm">
        {HEADER_MENU.map((item, i) => (
          <li className="hover:text-red-300" key={i}>
            <Link to={item.url}>
              <h2>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
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
