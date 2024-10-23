import React from "react";
import { lazy } from "react";

const AdminReservationPage = lazy(
  () => import("../pages/support/AdminReservationPage"),
);

const AdminReservationRouter = [
  {
    path: "/admin/reserve",
    children: [{ path: "", element: <AdminReservationPage /> }],
  },
];

export default AdminReservationRouter;
