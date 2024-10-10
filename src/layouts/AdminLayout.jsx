import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./../components/layouts/AdminHeader";
import AdminSidebar from "./../components/layouts/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="h-screen">
      <div className="mx-auto w-layout">
        <AdminHeader />
      </div>
      <div className="border-b border-gray-400"></div>
      <div className="mx-auto flex w-layout">
        <AdminSidebar />
        <main className="h-[88.9vh] w-full overflow-auto bg-gray-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
