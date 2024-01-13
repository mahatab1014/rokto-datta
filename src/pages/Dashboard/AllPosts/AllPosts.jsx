import useAuth from "../../../hooks/useAuth";
import useUserPostInfo from "../../../hooks/useUserPostInfo";
import { useState } from "react";
import PaginationButton from "../../../components/ui/PaginationButton/PaginationButton";
import DashboardPostsTable from "../../../components/ui/DashboardPostsTable/DashboardPostsTable";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { userPostInfo, userPostInfoLoading, userPostInfoRefetch } =
    useUserPostInfo(user?.uid, page, size);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user-post-info/${id}`).then((result) => {
          if (result.data.delete) {
            userPostInfoRefetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
            });
          } else {
            userPostInfoRefetch();
            Swal.fire({
              title: "Something went wrong!",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <section>
        <div className="overflow-x-auto bg-white rounded-box shadow-lg">
          <PaginationButton
            page={page}
            setPage={setPage}
            rowsPerPage={size}
            setRowsPerPage={setSize}
            totalPosts={userPostInfo?.total_data}
          />
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
              {userPostInfoLoading ? (
                <>
                  {[1, 2, 3].map((sk) => (
                    <tr key={sk}>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {userPostInfo?.total_data === 0 && (
                    <tr>
                      <td colSpan={7} className="text-lg text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </>
              )}

              {!userPostInfoLoading && (
                <>
                  {userPostInfo?.data?.map((post_info, index) => (
                    <DashboardPostsTable
                      handleDelete={handleDelete}
                      key={post_info?._id}
                      post_info={post_info}
                      index={index}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AllPosts;
