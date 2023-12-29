import { createBrowserRouter } from "react-router-dom";
import RootLayot from "../layouts/RootLayot";
import Home from "../pages/Home/Home";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default PublicRoutes;
