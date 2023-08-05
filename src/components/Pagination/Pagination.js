import _ from "lodash";
import classes from "./pagination.module.css";
const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      <nav>
        <ul className={classes.pagination}>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                style={{
                  cursor: "pointer",
                  color: "black",
                  float: "left",
                  padding: "8px 16px",
                  textDecoration: "none",
                }}
                onClick={() => onPageChange(page)}
                // className="page-link"
                className="active"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
