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

const ReservationFailPage = lazy(
  () => import("../pages/reservation/ReservationFailPage"),
);

const reservationRouter = [
  {
    path: "reserve",
    children: [
      { path: "", element: <ReservationTimePage /> },
      { path: "seat", element: <ReservationSeatPage /> },
      { path: "success", element: <ReservationSuccessPage /> },
      { path: "fail", element: <ReservationFailPage /> },
    ],
  },
];

export default reservationRouter;
