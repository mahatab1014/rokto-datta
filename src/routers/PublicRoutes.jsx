import { createBrowserRouter } from "react-router-dom";
import RootLayot from "../layouts/RootLayot";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blood-donors",
      },
      {
        path: "contact",
      },
      {
        path: "/dashboard",
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export default PublicRoutes;
