import { lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import reservationRouter from "./reservationRouter";
import supportRouter from "./supportRouter";
import greetingRouter from "./greetingRouter";
import adminMovieRouter from "./adminMovieRouter";
import movieRouter from "./movieRouter";
import mypageRouter from "./mypageRouter";
import adminSupportRouter from "./adminSupportRouter";
import adminMemberRouter from "./adminMemberRouter";
import adminReservationRouter from "./adminReservationRouter";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const InfoPage = lazy(() => import("../pages/info/InfoPage"));
const JoinPage = lazy(() => import("../pages/member/JoinPage"));
const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const FindInfoPage = lazy(() => import("../pages/member/FindInfoPage"));
const TermsPage = lazy(() => import("../pages/support/TermsPage"));
const ScreenrulePage = lazy(() => import("../pages/support/ScreenrulePage"));
const PrivacyPage = lazy(() => import("../pages/support/PrivacyPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BasicLayout />
        <ScrollRestoration />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "info", element: <InfoPage /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "/screenrule", element: <ScreenrulePage /> },
      { path: "/privacy", element: <PrivacyPage /> },
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
      ...adminSupportRouter,
      ...adminMemberRouter,
      ...adminReservationRouter,
    ],
  },
]);

export default root;
