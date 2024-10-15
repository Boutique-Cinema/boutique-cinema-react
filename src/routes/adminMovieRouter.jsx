import React from "react";
import { lazy } from "react";

const AdminMoviePage = lazy(
  () => import("../pages/admin/movie/AdminMoviePage"),
);

const AdminMovieRegisterPage = lazy(
  () => import("../pages/admin/movie/AdminMovieRegisterPage"),
);

const AdminMovieModifyPage = lazy(
  () => import("../pages/admin/movie/AdminMovieModifyPage"),
);

const adminMovieRouter = [
  {
    path: "movie/list",
    children: [{ path: "", element: <AdminMoviePage /> }],
  },
  {
    path: "movie",
    children: [{ path: "", element: <AdminMovieRegisterPage /> }],
  },
  {
    path: "movie/:movieNum",
    children: [{ path: "", element: <AdminMovieModifyPage /> }],
  },
];

export default adminMovieRouter;
