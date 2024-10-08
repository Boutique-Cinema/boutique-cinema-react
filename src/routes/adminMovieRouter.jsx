import React from "react";
import { lazy } from "react";

const AdminMoviePage = lazy(
  () => import("../pages/admin/movie/AdminMoviePage"),
);

const adminMovieRouter = [
  {
    path: "movie",
    children: [{ path: "", element: <AdminMoviePage /> }],
  },
];

export default adminMovieRouter;
