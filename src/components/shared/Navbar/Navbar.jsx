import { Link, NavLink } from "react-router-dom";
import LogoBangla from "../../../assets/images/logo/rokto-datta-ban.png";
import { useState } from "react";
import Container from "../../ui/Container/Container";
import { Avatar, Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = () => {
    // Update the state when the input changes
    setIsChecked(!isChecked);
  };

  const menuLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Blood Donors",
      path: "/blood-donors",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <>
      <Container>
        <div className="drawer">
          <input
            id="primary-mobile-menu"
            type="checkbox"
            className="drawer-toggle"
            checked={isChecked}
            // defaultChecked={isChecked}
          />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar p-0">
              <div className="flex-1">
                <Link to="/">
                  <img
                    className="h-10 w-auto"
                    src={LogoBangla}
                    alt="Rokto Datta"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="flex-none hidden lg:flex lg:items-center">
                <ul className="menu menu-horizontal py-0">
                  {menuLinks.map((menu, index) => (
                    <li key={index}>
                      <NavLink
                        to={menu?.path}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "nav-link-style-remove [&>button]:!font-bold"
                            : "nav-link-style-remove"
                        }
                      >
                        <Button
                          variant="text"
                          className="!text-neutral !font-normal"
                        >
                          {menu.name}
                        </Button>
                      </NavLink>
                    </li>
                  ))}

                  {!user && (
                    <li>
                      <NavLink
                        to="/sign-in"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "nav-link-style-remove [&>button]:!font-bold"
                            : "nav-link-style-remove"
                        }
                      >
                        <Button
                          variant="text"
                          className="!text-neutral !font-normal"
                        >
                          Sign In
                        </Button>
                      </NavLink>
                    </li>
                  )}
                </ul>

                {user && (
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <Avatar
                        sx={{ width: 35, height: 35 }}
                        alt={user?.displayName}
                        src={user?.photoURL}
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 [&>li>button]:!normal-case [&>li>button]:!font-semibold"
                    >
                      <li>
                        <Button
                          variant="text"
                          className="!text-neutral !font-normal active:!bg-white"
                        >
                          Profile
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="text"
                          className="!text-neutral !font-normal active:!bg-white"
                        >
                          Settings
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={() => signOutUser()}
                          variant="text"
                          className="!text-neutral !font-normal active:!bg-white"
                        >
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex-none lg:hidden">
                {user && (
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        alt={user?.displayName}
                        src={user?.photoURL}
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
                    >
                      <li>
                        <Button
                          variant="text"
                          className="!text-neutral !font-normal active:!bg-white"
                        >
                          Profile
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="text"
                          className="!text-neutral !font-normal active:!bg-white"
                        >
                          Settings
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={() => signOutUser()}
                          variant="text"
                          className="!text-neutral !font-normal active:!bg-white"
                        >
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="pl-5">
                  <svg
                    onClick={handleInputChange}
                    className={`fill-current ${isChecked === true && "hidden"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  <svg
                    onClick={handleInputChange}
                    className={` fill-current ${
                      isChecked !== true && "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="primary-mobile-menu"
              onClick={handleInputChange}
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              <div className="flex justify-center pb-6">
                <Link to="/">
                  <img
                    className="h-10 w-auto"
                    src={LogoBangla}
                    alt="Rokto Datta"
                    loading="lazy"
                  />
                </Link>
              </div>
              {menuLinks.map((menu, index) => (
                <li key={index}>
                  <NavLink to={menu?.path}>{menu.name}</NavLink>
                </li>
              ))}
              {!user && (
                <li>
                  <NavLink to="/sign-in">Sign In</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
