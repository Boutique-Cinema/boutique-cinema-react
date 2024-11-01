import React from "react";
import { lazy } from "react";

const MovieListPage = lazy(() => import("../pages/movie/MovieListPage"));
const MovieDetailPage = lazy(() => import("../pages/movie/MovieDetailPage"));

const movieRouter = [
  {
    path: "movie/list",
    children: [{ path: "", element: <MovieListPage /> }],
  },
  {
    path: "movie/:movieNum",
    children: [{ path: "", element: <MovieDetailPage /> }],
  },
];

export default movieRouter;
