import { RouterProvider } from "react-router-dom";
import root from "./routes/router";
import { Suspense } from "react";

const Loading = <div>Loading...</div>;

function App() {
  return (
    <>
      <Suspense fallback={Loading}>
        <RouterProvider router={root} />
      </Suspense>
    </>
  );
}

export default App;
