import { lazy } from "react";

const MyReservationPage = lazy(
  () => import("../pages/mypage/MyReservationPage"),
);

const MyCancelPage = lazy(() => import("../pages/mypage/MyCancelPage"));

const mypageRouter = [
  {
    path: "mypage",
    children: [
      { path: "reserve", element: <MyReservationPage /> },
      { path: "cancel", element: <MyCancelPage /> },
    ],
  },
];

export default mypageRouter;
