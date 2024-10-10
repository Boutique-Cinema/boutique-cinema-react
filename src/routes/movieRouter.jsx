import React from "react";
import { lazy } from "react";

const MovieListPage = lazy(() => import("../pages/movie/MovieListPage"));
const MovieDetailPage = lazy(() => import("../pages/movie/MovieDetailPage"));

const movieRouter = [
  {
    path: "movie",
    children: [
      { path: "", element: <MovieListPage /> },
      { path: "detail/:id", element: <MovieDetailPage /> },
    ],
  },
];

export default movieRouter;
