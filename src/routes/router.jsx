import { lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import JoinPage from "../pages/member/JoinPage";
import LoginPage from "../components/member/LoginComponent";
import supportRouter from "./supportRouter";
import greetingRouter from "./greetingRouter";
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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",

    element: <AdminLayout />,
    children: [
      ...adminSupport, // 이 부분을 추가해야 경로가 인식됩니다.
    ],
  },
]);

export default root;
