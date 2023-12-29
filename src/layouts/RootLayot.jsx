import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Container from "../components/ui/Container/Container";
import HomeRightMenu from "../components/shared/HomeRightMenu/HomeRightMenu";

const RootLayot = () => {
  return (
    <>
      <header className="bg-white border sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="bg-[#f9fafb] min-h-screen">
        <Container>
          <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-5 pt-5">
            <div className="w-full md:w-9/12">
              <Outlet />
            </div>
            <div className="w-full md:w-3/12 bg-white border rounded md:sticky md:top-20">
              <HomeRightMenu />
            </div>
          </div>
        </Container>
      </main>

      <footer></footer>
    </>
  );
};

export default RootLayot;
