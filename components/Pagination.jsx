import React from 'react';

const Pagination = ({page, maxPages, url}) => {
    const previousPageLink = (page >= 2 && page <= maxPages) ? <a className="pagination-previousLink" href={`${url}/?page=${page - 1}`}>← Prev </a> : null;
    const nextPageLink = ((page + 1) <= maxPages) ? <a className="pagination-nextLink" href={`${url}/?page=${page + 1}`}>Next →</a> : null
    return (
        <div className="pagination">
            { previousPageLink }
            { nextPageLink }
        </div>
    );
}

export default Pagination;