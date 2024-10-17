import { lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import JoinPage from "../pages/member/JoinPage";
import reservationRouter from "./reservationRouter";
import LoginPage from "../components/member/LoginComponent";
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
        {/* ScrollRestoration 추가(페이지 이동시 맨위 스크롤로 이동) */}
      </>
    ),
    children: [
      { index: true, element: <MainPage /> },
      { path: "info", element: <InfoPage /> },
      { path: "/mypage/reserve", element: <MyReservationPage /> },
      ...supportRouter,
      ...greetingRouter, // greetingRouter의 경로들을 병합
      ...reservationRouter,
      ...movieRouter,
    ],
  },
  {
    path: "/member/join", // 회원가입 페이지
    element: <JoinPage />,
  },
  {
    path: "/login", //  로그인 페이지
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
]);

export default root;
