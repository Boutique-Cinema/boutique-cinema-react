import { lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import reservationRouter from "./reservationRouter";
import supportRouter from "./supportRouter";
import greetingRouter from "./greetingRouter";
import adminMovieRouter from "./adminMovieRouter";
import movieRouter from "./movieRouter";
import mypageRouter from "./mypageRouter";
import adminSupport from "./adminSupportRouter";
import adminMemberRouter from "./adminMemberRouter";
import AdminReservationRouter from "./adminReservationRouter";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const InfoPage = lazy(() => import("../pages/info/InfoPage"));
const JoinPage = lazy(() => import("../pages/member/JoinPage"));
const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const FindInfoPage = lazy(() => import("../pages/member/FindInfoPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BasicLayout />
        <ScrollRestoration />
        {/* ScrollRestoration 추가(페이지 이동시 맨위 스크롤로 이동) */}
      </>
    ),
    children: [
      { index: true, element: <MainPage /> },
      { path: "info", element: <InfoPage /> },

      { path: "/member/find_info", element: <FindInfoPage /> },
      ...supportRouter,
      ...greetingRouter, // greetingRouter의 경로들을 병합
      ...reservationRouter,
      ...movieRouter,
      ...mypageRouter,
    ],
  },
  {
    path: "/member/join", // 회원가입 페이지
    element: <JoinPage />,
  },
  {
    path: "/member/login", //  로그인 페이지
    element: <LoginPage />,
  },
  {
    path: "/admin", // 관리자 페이지

    element: <AdminLayout />,
    children: [
      ...adminMovieRouter,
      ...adminSupport,
      ...adminMemberRouter,
      ...AdminReservationRouter,
    ],
  },
]);

export default root;
