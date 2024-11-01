import React from "react";
import { lazy } from "react";

const TheatherPage = lazy(() => import("../pages/greeting/TheaterPage"));
const CouplePage = lazy(() => import("../pages/greeting/CouplePage"));

const greetingRouter = [
  {
    path: "greeting",
    children: [
      { path: "theater", element: <TheatherPage /> },
      { path: "couple", element: <CouplePage /> },
    ],
  },
];

export default greetingRouter;
