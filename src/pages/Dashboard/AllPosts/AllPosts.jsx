import { Link } from "react-router-dom";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IconButton } from "@mui/material";

const AllPosts = () => {
  return (
    <>
      <section>
        <div className="overflow-x-auto bg-white rounded-box shadow-lg">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Published</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>
                  <Link className="hover:underline">
                    Urgent Blood Needed : Urgent Blood Needed
                  </Link>
                </td>
                <td>Active</td>
                <td>03</td>
                <td>01, 05, 2024 | 10:14 am</td>
                <td>
                  <Link>
                    <IconButton aria-label="edit">
                      <MdEditNote className="text-xl lg:text-2xl" />
                    </IconButton>
                  </Link>
                </td>
                <td>
                  <IconButton aria-label="delete">
                    <MdDelete className="text-xl lg:text-2xl" />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>
                  <Link className="hover:underline">
                    Urgent Blood Needed : Urgent Blood Needed
                  </Link>
                </td>
                <td>Active</td>
                <td>03</td>
                <td>01, 05, 2024 | 10:14 am</td>
                <td>
                  <Link>
                    <IconButton aria-label="edit">
                      <MdEditNote className="text-xl lg:text-2xl" />
                    </IconButton>
                  </Link>
                </td>
                <td>
                  <IconButton aria-label="delete">
                    <MdDelete className="text-xl lg:text-2xl" />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th>3</th>
                <td>
                  <Link className="hover:underline">
                    Urgent Blood Needed : Urgent Blood Needed
                  </Link>
                </td>
                <td>Active</td>
                <td>03</td>
                <td>01, 05, 2024 | 10:14 am</td>
                <td>
                  <Link>
                    <IconButton aria-label="edit">
                      <MdEditNote className="text-xl lg:text-2xl" />
                    </IconButton>
                  </Link>
                </td>
                <td>
                  <IconButton aria-label="delete">
                    <MdDelete className="text-xl lg:text-2xl" />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th>4</th>
                <td>
                  <Link className="hover:underline">
                    Urgent Blood Needed : Urgent Blood Needed
                  </Link>
                </td>
                <td>Active</td>
                <td>03</td>
                <td>01, 05, 2024 | 10:14 am</td>
                <td>
                  <Link>
                    <IconButton aria-label="edit">
                      <MdEditNote className="text-xl lg:text-2xl" />
                    </IconButton>
                  </Link>
                </td>
                <td>
                  <IconButton aria-label="delete">
                    <MdDelete className="text-xl lg:text-2xl" />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AllPosts;
