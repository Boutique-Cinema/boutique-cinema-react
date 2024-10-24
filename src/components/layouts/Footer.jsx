import React from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 h-[150px] w-full place-content-center bg-footer text-gray-200">
      <div className="mx-auto flex h-full w-layout py-5">
        <div className="flex w-[25%] flex-col justify-between border-r border-r-gray-500">
          <Link to={"/support"}>
            <h2 className="text-xl">고객센터</h2>
          </Link>
          <ul>
            <li className="mb-2">
              <Link to={"/support/notice"}>공지사항</Link>
            </li>
            <li>
              <Link to={"/support/qna"}>1:1 문의</Link>
            </li>
          </ul>
        </div>
        <div className="w-[35%] border-r border-r-gray-500 px-8">
          <ul className="flex h-full flex-col justify-between">
            <li>
              <Link to={"info"}>
                <h2>회사소개</h2>
              </Link>
            </li>
            <li>
              <Link to={"/terms"}>이용약관</Link>
            </li>
            <li>
              <Link to={"/privacy"}>개인정보처리방침</Link>
            </li>
            <li>
              <Link to={"/screenrule"}>스크린 배정수에 관한 기준</Link>
            </li>
          </ul>
        </div>
        <div className="flex h-full w-[40%] flex-col justify-between pl-8">
          <div className="-mt-4">
            <Logo />
          </div>
          <small>Copyright @ Boutique Cinema All Rights Reserved</small>
        </div>
      </div>
    </footer>
  );
}
