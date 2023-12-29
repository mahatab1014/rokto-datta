import { Outlet } from "react-router-dom";

const RootLayot = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default RootLayot;
