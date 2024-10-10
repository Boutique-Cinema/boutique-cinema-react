import React from "react";
import Logo from "../common/Logo";

export default function AdminHeader() {
  return (
    <header className="flex h-[11vh] items-end">
      <div className="w-1/3">
        <a href="/admin/movie">
          <Logo />
        </a>
      </div>
      <div className="mb-5 ml-10 flex w-2/3 items-end justify-between">
        <div>환영합니다. 관리자님!</div>
        <button className="items-center rounded border border-none bg-secondary p-2 hover:bg-secondary-hover">
          로그아웃
        </button>
      </div>
    </header>
  );
}
