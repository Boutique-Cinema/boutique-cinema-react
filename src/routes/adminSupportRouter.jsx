import React from "react";
import { lazy } from "react";

const AdminNoticeListPage = lazy(
  () => import("../pages/admin/support/AdminNoticeListPage"),
);
const AdminNoticeDetailPage = lazy(
  () => import("../pages/admin/support/AdminNoticeDetailPage"),
);
const AdminNoticeRegisterPage = lazy(
  () => import("../pages/admin/support/AdminNoticeRegisterPage"),
);
const AdminNoticeModifyPage = lazy(
  () => import("../pages/admin/support/AdminNoticeModifyPage"), // 추가된 부분
);

const adminSupportRouter = [
  {
    path: "support/notice", // "/admin/support/notice" 경로
    children: [
      {
        path: "",
        element: <AdminNoticeListPage />, // 공지사항 목록 페이지
      },
      {
        path: ":nnum",
        element: <AdminNoticeDetailPage />, // 공지사항 상세 페이지
      },
      {
        path: "register",
        element: <AdminNoticeRegisterPage />, // 공지사항 등록 페이지
      },
      {
        path: ":nnum/modify", // 수정 페이지 경로 추가
        element: <AdminNoticeModifyPage />, // 공지사항 수정 페이지
      },
    ],
  },
];

export default adminSupportRouter;
