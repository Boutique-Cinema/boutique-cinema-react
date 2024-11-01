import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center text-white">
      <span className="logo -mr-2 mt-2">Boutique</span>
      <img
        src="/logo.png"
        alt="부띠끄 시네마 로고"
        className="h-[90px] w-[90px] object-cover"
      />
      <span className="logo -ml-2 mt-2">Cinema</span>
    </div>
  );
}
