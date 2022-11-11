import { Navigate, useRoutes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import MainPage from "./pages/MainPage";
import ManagerPage from "./pages/ManagerPage";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/manager",
      element: <ManagerPage />,
    },
    {
      path: "/:id",
      element: <DetailPage />,
    },
    {
      path: "/:id/edit",
      element: <EditPage />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
};

export default Routes;
