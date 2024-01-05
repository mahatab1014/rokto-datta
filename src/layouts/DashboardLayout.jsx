import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import DashboardNav from "../components/ui/DashboardNav/DashboardNav";
const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <DashboardNav />
        <Box component="main" className="p-3 md:p-4 lg:p-6" sx={{ flexGrow: 1,}}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default DashboardLayout;
