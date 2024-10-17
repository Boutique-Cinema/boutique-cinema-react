import { RouterProvider } from "react-router-dom";
import root from "./routes/router";
import { Suspense } from "react";

const Loading = (
  <div className="m-auto mt-40 h-10 w-10">
    <img
      className="h-full w-full"
      src="https://bizmall.golfzon.com/imgs/global/ajax_loader.gif"
      alt="로딩중"
    />
  </div>
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={Loading}>
        <RouterProvider router={root} />
      </Suspense>
    </div>
  );
}

export default App;
