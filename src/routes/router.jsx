import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";

const Loading = <div>Loading...</div>;
const MainPage = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element:
    <AdminPage/>
  }
]);

export default root;
