import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import JoinPage from "../pages/member/JoinPage";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const InfoPage = lazy(() => import("../pages/info/InfoPage"));
const TermsPage = lazy(() => import("../pages/support/TermsPage"));
const ScreenrulePage = lazy(() => import("../pages/support/ScreenrulePage"));
const PrivacyPage = lazy(() => import("../pages/support/PrivacyPage"));
const TheaterPage = lazy(() => import("../pages/greeting/TheaterPage"));
const CouplePage = lazy(() => import("../pages/greeting/CouplePage"));

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
      { path: "/greeting/teater", element: <TheaterPage /> },
      { path: "/greeting/couple", element: <CouplePage /> },
    ],
  },
  {
    path: "api/member/joinpage",
    element: <JoinPage />,
  },
]);

export default root;
