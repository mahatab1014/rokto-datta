import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import PostDetails from "../pages/PostDetails/PostDetails";
import BloodDonors from "../pages/BloodDonors/BloodDonors";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllPosts from "../pages/Dashboard/AllPosts/AllPosts";
import DonationsHistory from "../pages/Dashboard/DonationsHistory/DonationsHistory";
import Profile from "../pages/Dashboard/Profile/Profile";
import BloodDonorProfile from "../pages/BloodDonorProfile/BloodDonorProfile";
import EditPost from "../pages/Dashboard/EditPost/EditPost";
import NotFound from "../pages/ErrorPages/NotFound";
import DashBoardError from "../pages/ErrorPages/DashBoardError";
import ContactUs from "../pages/Contact/ContactUs";

const PublicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post/:id",
        element: <PostDetails />,
      },
      {
        path: "blood-donors",
        element: <BloodDonors />,
      },
      {
        path: "donor/:id",
        element: <BloodDonorProfile />,
      },
      {
        path: "contact",
        element: <ContactUs />
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "all-posts",
            element: <AllPosts />,
          },
          {
            path: "edit-post/:id",
            element: <EditPost />,
          },
          {
            path: "donations-history",
            element: <DonationsHistory />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "*",
            element: <DashBoardError />
          }
        ],
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default PublicRoutes;
