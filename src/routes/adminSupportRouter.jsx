import React from "react";
import { lazy } from "react";

const AdminNoticeList = lazy(
  () => import("../components/support/AdminNoticeList"),
);
const AdminNoticeDetail = lazy(
  () => import("../components/support/AdminNoticeDetail"),
);
const AdminNoticeRegister = lazy(
  () => import("../components/support/AdminNoticeRegister"),
);
const AdminNoticeModify = lazy(
  () => import("../components/support/AdminNoticeModify"), // 추가된 부분
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
        path: ":nnum",
        element: <AdminNoticeDetail />, // 공지사항 상세 페이지
      },
      {
        path: "register",
        element: <AdminNoticeRegister />, // 공지사항 등록 페이지
      },
      {
        path: ":nnum/modify", // 수정 페이지 경로 추가
        element: <AdminNoticeModify />, // 공지사항 수정 페이지
      },
    ],
  },
];

export default adminSupport;
