import React from "react";
import { lazy } from "react";

const AdminReservationPage = lazy(
  () => import("../pages/admin/reservation/AdminReservationPage"),
);

const adminReservationRouter = [
  {
    path: "/admin/reserve",
    children: [{ path: "", element: <AdminReservationPage /> }],
  },
];

export default adminReservationRouter;
