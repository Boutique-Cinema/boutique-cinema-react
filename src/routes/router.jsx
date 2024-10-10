import { lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import JoinPage from "../pages/member/JoinPage";
import supportRouter from "./supportRouter";
import greetingRouter from "./greetingRouter";
import movieRouter from "./movieRouter";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const InfoPage = lazy(() => import("../pages/info/InfoPage"));
const MyReservationPage = lazy(
  () => import("../pages/mypage/MyReservationPage"),
);

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BasicLayout />
        <ScrollRestoration />
      </>
    ),
    children: [
      { index: true, element: <MainPage /> },
      { path: "info", element: <InfoPage /> },
      { path: "/mypage/reserve", element: <MyReservationPage /> },
      ...supportRouter,
      ...movieRouter,
      ...greetingRouter, // greetingRouter의 경로들을 병합
    ],
  },
  {
    path: "/member/join",
    element: <JoinPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
]);

export default root;
