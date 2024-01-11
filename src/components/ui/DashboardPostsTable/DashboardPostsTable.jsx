import { Link } from "react-router-dom";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IconButton } from "@mui/material";
import moment from "moment";

const DashboardPostsTable = ({ index, post_info }) => {
  return (
    <>
      <tr>
        <th>{index+1}</th>
        <td>
          <Link to={`/post/${post_info?._id}`} className="hover:underline">
            {post_info?.title}
          </Link>
        </td>
        <td>Active</td>
        <td>{post_info?.comment_count}</td>
        <td>
          {moment(post_info?.posted_at).format("DD, MM, YYYY — h:mm a")}
          {/* 01, 05, 2024 | 10:14 am */}
        </td>
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
    </>
  );
};

export default DashboardPostsTable;
