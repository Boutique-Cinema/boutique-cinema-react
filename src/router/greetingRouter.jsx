import React from "react";
import TheatherPage from "../pages/greeting/TheaterPage";
import CouplePage from "../pages/greeting/CouplePage";

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
