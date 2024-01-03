import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";

const PaginationButton = ({
  setRowsPerPage,
  rowsPerPage,
  page,
  setPage,
  totalPosts,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex justify-center pt-10 pb-16">
      <TablePagination
        className="bg-slate-100 rounded border"
        component="div"
        count={totalPosts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default PaginationButton;

PaginationButton.propTypes = {
  setRowsPerPage: PropTypes.any,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.any,
  totalPosts: PropTypes.number,
};
