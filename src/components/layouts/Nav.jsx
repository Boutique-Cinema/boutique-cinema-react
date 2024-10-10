import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="w-[300px]">
      <h2 className="sr-only">주요 서비스</h2>
      <menu className="flex justify-around text-xl font-medium">
        <li className="hover:text-red-300">
          <Link to={"/movie"}>
            <h2>영화</h2>
          </Link>
        </li>
        <li className="hover:text-red-300">
          <Link to={"/reserve"}>예매</Link>
        </li>
      </menu>
    </nav>
  );
}
