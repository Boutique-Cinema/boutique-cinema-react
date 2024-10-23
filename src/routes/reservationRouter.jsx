import { lazy } from "react";

const ReservationTimePage = lazy(
  () => import("../pages/reservation/ReservationTimePage"),
);

const ReservationSeatPage = lazy(
  () => import("../pages/reservation/ReservationSeatPage"),
);

const ReservationSuccessPage = lazy(
  () => import("../pages/reservation/ReservationSuccessPage"),
);

const reservationRouter = [
  {
    path: "reserve",
    children: [
      { path: "", element: <ReservationTimePage /> },
      { path: "seat", element: <ReservationSeatPage /> },
      { path: "success", element: <ReservationSuccessPage /> },
    ],
  },
];

export default reservationRouter;
