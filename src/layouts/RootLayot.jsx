import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const RootLayot = () => {
  return (
    <>
      <header className="bg-white border sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="bg-[#f9fafb] min-h-screen">
        <Outlet />
      </main>

      <footer></footer>
    </>
  );
};

export default RootLayot;
