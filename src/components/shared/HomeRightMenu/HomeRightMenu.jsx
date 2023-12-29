import { FaDroplet, FaFileLines, FaFileWaveform } from "react-icons/fa6";

import { NavLink, useLocation } from "react-router-dom";

const HomeRightMenu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postTypeParam = queryParams.get("postType");

  return (
    <>
      <ul className="p-5 space-y-1">
        <li>
          <NavLink
            className={`menu-list ${
              !postTypeParam ? "!border-gray-300 !bg-gray-100" : ""
            }`}
            to="/"
          >
            <FaFileLines />
            <span>All Post</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`menu-list ${
              postTypeParam === "recent" ? "!border-gray-300 !bg-gray-100" : ""
            }`}
            to="/?postType=recent"
          >
            <FaFileWaveform />
            <span>Recent Post</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`menu-list ${
              postTypeParam === "urgent" ? "!border-gray-300 !bg-gray-100" : ""
            }`}
            to="/?postType=urgent"
          >
            <FaDroplet className="text-[#f85b43]" />
            <span>Urgent Blood</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default HomeRightMenu;
