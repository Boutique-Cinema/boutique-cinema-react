import { Suspense, lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import reservationRouter from "./reservationRouter";
import supportRouter from "./supportRouter";
import greetingRouter from "./greetingRouter";
import adminMovieRouter from "./adminMovieRouter";
import movieRouter from "./movieRouter";
import adminSupport from "./adminSupportRouter";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const InfoPage = lazy(() => import("../pages/info/InfoPage"));
const JoinPage = lazy(() => import("../pages/member/JoinPage"));
const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const FindInfoPage = lazy(() => import("../pages/member/FindInfoPage"));
const Loading = <div>Loading....</div>;
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
      { path: "/member/find_info", element: <FindInfoPage /> },
      ...supportRouter,
      ...greetingRouter, // greetingRouter의 경로들을 병합
      ...reservationRouter,
      ...movieRouter,
    ],
  },
  {
    path: "/member/join",
    element: <JoinPage />,
  },
  {
    path: "/member/login", //  로그인 페이지
    element: (
      <Suspense fallback={Loading}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/admin",

    element: <AdminLayout />,
    children: [...adminMovieRouter, ...adminSupport],
  },
]);

export default root;
