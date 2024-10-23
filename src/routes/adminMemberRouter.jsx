import React from "react";
import { lazy } from "react";

const AdminMemberPage = lazy(() => import("../pages/support/AdminMemberList"));

const adminMemberRouter = [
  {
    path: "member",
    children: [{ path: "", element: <AdminMemberPage /> }],
  },
];

export default adminMemberRouter;
