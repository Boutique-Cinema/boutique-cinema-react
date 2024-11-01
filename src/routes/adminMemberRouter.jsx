import React from "react";
import { lazy } from "react";

const AdminMemberPage = lazy(
  () => import("../pages/admin/member/AdminMemberPage"),
);

const adminMemberRouter = [
  {
    path: "member",
    children: [{ path: "", element: <AdminMemberPage /> }],
  },
];

export default adminMemberRouter;
