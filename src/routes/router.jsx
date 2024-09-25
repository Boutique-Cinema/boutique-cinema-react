import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import greetingRouter from "../router/greetingRouter";
import JoinPage from "../pages/member/JoinPage";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const InfoPage = lazy(() => import("../pages/info/InfoPage"));
const TermsPage = lazy(() => import("../pages/support/TermsPage"));
const ScreenrulePage = lazy(() => import("../pages/support/ScreenrulePage"));
const PrivacyPage = lazy(() => import("../pages/support/PrivacyPage"));

// const MyReservationPage = lazy(
//   () => import("../pages/mypage/MyReservationPage"),
// );import AdminLayout from './../layouts/AdminLayout';

const root = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "info", element: <InfoPage /> },
      { path: "/support/terms", element: <TermsPage /> },
      { path: "/support/screenrule", element: <ScreenrulePage /> },
      { path: "/support/privacy", element: <PrivacyPage /> },
      ...greetingRouter, // greetingRouter의 경로들을 병합
      // { path: "mypage/reserve", element: <MyReservationPage /> },
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
