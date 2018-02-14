import React from "react";
import {Link} from "react-router";

const Pagination = ({page, maxPages, url, previousLinkClickHandler, nextLinkClickHandler}) => {
    const previousPageLink = (page >= 2 && page <= maxPages) ? <Link onClick={previousLinkClickHandler} className="pagination-previousLink" to={`${url}${page - 1}`}>← Prev </Link> : null;
    const nextPageLink = ((page + 1) <= maxPages) ? <Link onClick={nextLinkClickHandler} className="pagination-nextLink" to={`${url}${page + 1}`}>Next →</Link> : null
    return (
        <div className="pagination">
            { previousPageLink }
            { nextPageLink }
        </div>
    );
}

Pagination.defaultProps = {
    previousLinkClickHandler: () => {},
    nextLinkClickHandler: () => {}
};

export default Pagination;