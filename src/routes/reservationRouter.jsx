import { lazy } from "react";

const ReservationTimePage = lazy(
  () => import("../pages/reservation/ReservationTimePage"),
);

const reservationRouter = [
  {
    path: "reserve",
    children: [{ path: "", element: <ReservationTimePage /> }],
  },
];

export default reservationRouter;
