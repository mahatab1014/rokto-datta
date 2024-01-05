import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import DashboardNav from "../components/ui/DashboardNav/DashboardNav";
const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <DashboardNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default DashboardLayout;
