import { Link } from "react-router-dom";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";

import { IconButton } from "@mui/material";
const DonationsHistory = () => {
  return (
    <>
      <section>
        <div className="overflow-x-auto bg-white rounded-box shadow-lg">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Phone Number</th>
                <th>View Post</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Mahtab Hoosen Suoip</td>
                <td>01, 05, 2024 | 10:14 am</td>
                <td>Active</td>
                <td>01777502225</td>
                <td>
                  <Link>
                    <IconButton>
                      <IoOpenOutline className="text-xl lg:text-2xl" />
                    </IconButton>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DonationsHistory;
