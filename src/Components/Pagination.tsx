import React, { FC, Fragment, useEffect } from 'react';

interface IProps {
    totalRecords: number;
    pageLimit?: number;
    pageNeighbours?: number;
    onPageChange: (data: any) => void;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

const Pagination: FC<IProps> = ({
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChange
}: IProps) => {
    const PageLimit = pageLimit ? pageLimit : 15;
    const TotalRecords = totalRecords ? totalRecords : 0;
    const PageNeighbours = pageNeighbours
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    const totalPages = Math.ceil(TotalRecords / PageLimit);

    const [currentPage, setCurrentPage] = React.useState(1);

    useEffect(() => {
        gotoPage(1);
    }, []);

    const fetchPageNumbers = () => {
        const totalNumbers = PageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - PageNeighbours);
            const endPage = Math.min(
                totalPages - 1,
                currentPage + PageNeighbours
            );
            let pages: any = range(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = totalPages - endPage > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case hasLeftSpill && !hasRightSpill: {
                    const extraPages = range(
                        startPage - spillOffset,
                        startPage - 1
                    );
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case !hasLeftSpill && hasRightSpill: {
                    const extraPages = range(
                        endPage + 1,
                        endPage + spillOffset
                    );
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case hasLeftSpill && hasRightSpill:
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    };

    const gotoPage = (page: number) => {
        const CurrentPage = Math.max(0, Math.min(page, totalPages));
        const paginationData = {
            CurrentPage,
            totalPages,
            PageLimit,
            TotalRecords
        };
        const currentPageState = () => onPageChange(paginationData);
        setCurrentPage(currentPageState);
    };

    const handleClick = (page: number) => (evt: Event) => {
        evt.preventDefault();
        gotoPage(page);
    };

    const handleMoveLeft = (evt: Event) => {
        evt.preventDefault();
        gotoPage(currentPage - PageNeighbours * 2 - 1);
    };

    const handleMoveRight = (evt: Event) => {
        evt.preventDefault();
        gotoPage(currentPage + PageNeighbours * 2 + 1);
    };

    if (!TotalRecords || totalPages === 1) return null;
    const pages = fetchPageNumbers();
    return (
        <Fragment>
            <nav>
                <ul className="pagination">
                    {pages.map((page, index) => {
                        if (page === LEFT_PAGE)
                            return (
                                <li key={index} className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Previous"
                                        onClick={(e) => handleMoveLeft}
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                    </a>
                                </li>
                            );

                        if (page === RIGHT_PAGE)
                            return (
                                <li key={index} className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Next"
                                        onClick={(e) => handleMoveRight}
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            );

                        return (
                            <li
                                key={index}
                                className={`page-item${
                                    currentPage === page ? ' active' : ''
                                }`}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => handleClick(page)}
                                >
                                    {page}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </Fragment>
    );
};

export default Pagination;
