import React from "react";
import { lazy } from "react";

const AdminNoticeList = lazy(
  () => import("../components/support/AdminNoticeList"),
);
const AdminNoticeDetail = lazy(
  () => import("../components/support/AdminNoticeDetail"),
);

const adminSupport = [
  {
    path: "support/notice", // "/admin/support/notice" 경로
    children: [
      {
        path: "",
        element: <AdminNoticeList />, // 공지사항 목록 페이지
      },
      {
        path: "detail/:id",
        element: <AdminNoticeDetail />, // 공지사항 상세 페이지
      },
    ],
  },
];

export default adminSupport;
