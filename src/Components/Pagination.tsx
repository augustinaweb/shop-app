import React, { FC, Fragment, useEffect } from 'react';

interface IProps {
	totalRecords: number;
	pageLimit?: number;
	pageNeighbours?: number;
	onPageChange: (data: any) => void;
	currentPage: number;
	//onClick: () => void;
}

const range = (from: number, to: number) => {
	let i = from;
	const range = [];

	while (i <= to) {
		range.push(i);
		i += 1;
	}

	return range;
};

const Pagination: FC<IProps> = ({
	totalRecords,
	pageLimit,
	pageNeighbours,
	onPageChange,
	currentPage
}: IProps) => {
	const _pageLimit = pageLimit ?? 6;
	const _pageNeighbours = pageNeighbours
		? Math.max(0, Math.min(pageNeighbours, 2))
		: 0;
	const totalPages = Math.ceil(totalRecords / _pageLimit);

	const LEFT_PAGE = 'LEFT';
	const RIGHT_PAGE = 'RIGHT';

	const fetchPageNumbers = () => {
		const totalNumbers = _pageNeighbours * 2 + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - _pageNeighbours);
			const endPage = Math.min(
				totalPages - 1,
				currentPage + _pageNeighbours
			);
			let pages: (number | string)[] = range(startPage, endPage);

			const hasLeftSpill = startPage > 2;
			const hasRightSpill = totalPages - endPage > 1;
			const spillOffset = totalPages - (pages.length + 2);

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

	const handleClick = () => {
		//const handleClick = (evt: React.MouseEvent<HTMLElement>, page: number) => {
		console.log('test');
		//console.log(page);
		//const selectedPage = Math.max(0, Math.min(page, totalPages));
		//const paginationData = {
		//	selectedPage,
		//	_pageLimit
		//};
		//evt.preventDefault();
		//onPageChange(paginationData);
	};

	const handleMoveLeft = (evt: React.MouseEvent<HTMLElement>) => {
		evt.preventDefault();
		//handleClick(evt, currentPage - _pageNeighbours * 2 - 1);
	};

	const handleMoveRight = (evt: React.MouseEvent<HTMLElement>) => {
		evt.preventDefault();
		//handleClick(evt, currentPage + _pageNeighbours * 2 + 1);
	};

	if (!totalRecords || totalPages === 1) return null;
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
									>
										<span
											onClick={() => handleMoveLeft}
											aria-hidden="true"
										>
											&laquo;
										</span>
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
									>
										<span
											onClick={(e) => handleMoveRight}
											aria-hidden="true"
										>
											&raquo;fff
										</span>
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
								<p onClick={(e) => console.log('test')}>
									{page}
								</p>
								{/*<a
									className="page-link"
									href="#"
									onClick={(
										e: React.MouseEvent<HTMLElement>
									) => handleClick(e, +page)}
								>
									{page}
								</a>*/}
							</li>
						);
					})}
				</ul>
			</nav>
		</Fragment>
	);
};

export default Pagination;
