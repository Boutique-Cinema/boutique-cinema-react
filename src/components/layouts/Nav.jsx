import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="w-[300px]">
      <menu className="flex justify-around text-xl font-medium">
        <li className="hover:text-red-300">
          <Link to={"/movie"}>
            <h2>영화</h2>
          </Link>
        </li>
        <li className="hover:text-red-300">
          <Link to={"/reservation"}>
            <h2>예매</h2>
          </Link>
        </li>
      </menu>
    </nav>
  );
}
