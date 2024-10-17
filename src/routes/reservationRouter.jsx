import { lazy } from "react";

const ReservationTimePage = lazy(
  () => import("../pages/reservation/ReservationTimePage"),
);

const ReservationSeatPage = lazy(
  () => import("../pages/reservation/ReservationSeatPage"),
);

const reservationRouter = [
  {
    path: "reserve",
    children: [
      { path: "", element: <ReservationTimePage /> },
      { path: "seat", element: <ReservationSeatPage /> },
    ],
  },
];

export default reservationRouter;
