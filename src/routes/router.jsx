import { lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import JoinPage from "../pages/member/JoinPage";
import LoginPage from "../pages/member/LoginPage";
import FindInfoPage from "../pages/member/FindInfoPage";
// import reservationRouter from "./reservationRouter";
import supportRouter from "./supportRouter";
import greetingRouter from "./greetingRouter";
import adminMovieRouter from "./adminMovieRouter";
import movieRouter from "./movieRouter";
import adminSupport from "./adminSupportRouter";

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
      { path: "/member/find_info", element: <FindInfoPage /> },
      ...supportRouter,
      ...movieRouter,
      ...greetingRouter,
    ],
  },
  {
    path: "/member/join",
    element: <JoinPage />,
  },
  {
    path: "/member/login", //  로그인 페이지
    element: <LoginPage />,
  },
  {
    path: "/admin",

    element: <AdminLayout />,
    children: [...adminMovieRouter, ...adminSupport],
  },
]);

export default root;
