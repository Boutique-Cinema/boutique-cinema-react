import React, { Suspense } from "react";
import { lazy } from "react";

const NoticeListPage = lazy(() => import("../pages/support/NoticeListPage"));

const NoticeDetailPage = lazy(
  () => import("../pages/support/NoticeDetailPage"),
);
const QnaPage = lazy(() => import("../pages/support/QnaPage"));
const QnaDetailPage = lazy(() => import("../pages/support/QnaDetailPage"));
const QnaRegisterPage = lazy(() => import("../pages/support/QnaRegisterPage"));

const supportRouter = [
  {
    path: "support",
    children: [
      { path: "", element: <NoticeListPage /> }, // 기본 경로로 고객센터 페이지를 설정하고, notice페이지로 바로 리다이렉트합니다.
      { path: "notice", element: <NoticeListPage /> },
      {
        path: "notice/:nnum",
        element: <NoticeDetailPage />,
      },
      { path: "qna", element: <QnaPage /> },
      { path: "qna/detail/:qNum", element: <QnaDetailPage /> },
      { path: "qna/register", element: <QnaRegisterPage /> },
    ],
  },
];

export default supportRouter;
