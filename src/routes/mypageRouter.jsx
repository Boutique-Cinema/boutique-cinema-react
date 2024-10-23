import { lazy } from "react";

const MyReservationPage = lazy(
  () => import("../pages/mypage/MyReservationPage"),
);
const MyCancelPage = lazy(() => import("../pages/mypage/MyCancelPage"));
const MyReviewPage = lazy(() => import("../pages/mypage/MyReviewPage"));
const MyReviewWrite = lazy(() => import("../components/mypage/MyReviewWrite"));

const mypageRouter = [
  {
    path: "mypage",
    children: [
      { path: "reserve", element: <MyReservationPage /> },
      { path: "cancel", element: <MyCancelPage /> },
      { path: "review", element: <MyReviewPage /> },
      { path: "review/write", element: <MyReviewWrite /> },
    ],
  },
];

export default mypageRouter;
