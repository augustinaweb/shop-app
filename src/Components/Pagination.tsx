import React, { FC, Fragment, useState } from 'react';
import { Product } from '../App';

interface IProps {
	totalRecords: number;
	pageLimit?: number;
	pageNeighbours?: number;
	className: string;
	handlePageChange: (arg: number, arg2: number) => void;
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
	handlePageChange
}: IProps) => {
	const _pageLimit = pageLimit ?? 4;
	const _pageNeighbours = pageNeighbours
		? Math.max(0, Math.min(pageNeighbours, 2))
		: 0;
	const totalPages = Math.ceil(totalRecords / _pageLimit);
	const [currentPage, setCurrentPage] = useState(1);

	const LEFT_PAGE = 'LEFT';
	const RIGHT_PAGE = 'RIGHT';

	React.useEffect(() => {
		handlePageChange(currentPage, _pageLimit);
	}, []);

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

			switch (true) {
				// handle: (1) < {5 6} [7] {8 9} (10)
				case hasLeftSpill && !hasRightSpill: {
					pages = [LEFT_PAGE, ...pages];
					break;
				}

				// handle: (1) {2 3} [4] {5 6} > (10)
				case !hasLeftSpill && hasRightSpill: {
					pages = [...pages, RIGHT_PAGE];
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

	const handleClick = (evt: React.MouseEvent<HTMLElement>, page: number) => {
		evt.preventDefault();
		setCurrentPage(page);
		handlePageChange(page, _pageLimit);
	};

	const handleMoveLeft = (evt: React.MouseEvent<HTMLElement>) => {
		evt.preventDefault();
		handleClick(evt, currentPage - _pageNeighbours - 1);
	};

	const handleMoveRight = (evt: React.MouseEvent<HTMLElement>) => {
		evt.preventDefault();
		handleClick(evt, currentPage + _pageNeighbours + 1);
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
											onClick={handleMoveLeft}
											aria-hidden="true"
										>
											&laquo;
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
											onClick={handleMoveRight}
											aria-hidden="true"
										>
											&raquo;
										</span>
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
									onClick={(
										e: React.MouseEvent<HTMLElement>
									) => handleClick(e, +page)}
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

//interface IProps {
//	pageLimit?: number;
//	pageNeighbours?: number;
//	className: string;
//	setCurrentProducts: (arg: Product[]) => void;
//	products: Product[];
//}

//const range = (from: number, to: number) => {
//	let i = from;
//	const range = [];

//	while (i <= to) {
//		range.push(i);
//		i += 1;
//	}

//	return range;
//};

//const Pagination: FC<IProps> = ({
//	pageLimit,
//	pageNeighbours,
//	setCurrentProducts,
//	products
//}: IProps) => {
//	const totalRecords = products.length;
//	const _pageLimit = pageLimit ?? 4;
//	const _pageNeighbours = pageNeighbours
//		? Math.max(0, Math.min(pageNeighbours, 2))
//		: 0;
//	const totalPages = Math.ceil(totalRecords / _pageLimit);
//	const [currentPage, setCurrentPage] = useState(1);

//	const LEFT_PAGE = 'LEFT';
//	const RIGHT_PAGE = 'RIGHT';

//	React.useEffect(() => {
//		setCurrentProducts(
//			products.slice(
//				(currentPage - 1) * _pageLimit,
//				currentPage * _pageLimit
//			)
//		);
//	}, [currentPage]);

//	const fetchPageNumbers = () => {
//		const totalNumbers = _pageNeighbours * 2 + 3;
//		const totalBlocks = totalNumbers + 2;

//		if (totalPages > totalBlocks) {
//			const startPage = Math.max(2, currentPage - _pageNeighbours);
//			const endPage = Math.min(
//				totalPages - 1,
//				currentPage + _pageNeighbours
//			);
//			let pages: (number | string)[] = range(startPage, endPage);
//			const hasLeftSpill = startPage > 2;
//			const hasRightSpill = totalPages - endPage > 1;

//			switch (true) {
//				// handle: (1) < {5 6} [7] {8 9} (10)
//				case hasLeftSpill && !hasRightSpill: {
//					pages = [LEFT_PAGE, ...pages];
//					break;
//				}

//				// handle: (1) {2 3} [4] {5 6} > (10)
//				case !hasLeftSpill && hasRightSpill: {
//					pages = [...pages, RIGHT_PAGE];
//					break;
//				}

//				// handle: (1) < {4 5} [6] {7 8} > (10)
//				case hasLeftSpill && hasRightSpill:
//				default: {
//					pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
//					break;
//				}
//			}

//			return [1, ...pages, totalPages];
//		}
//		return range(1, totalPages);
//	};

//	const handleClick = (evt: React.MouseEvent<HTMLElement>, page: number) => {
//		evt.preventDefault();
//		setCurrentPage(page);
//	};

//	const handleMoveLeft = (evt: React.MouseEvent<HTMLElement>) => {
//		evt.preventDefault();
//		handleClick(evt, currentPage - _pageNeighbours - 1);
//	};

//	const handleMoveRight = (evt: React.MouseEvent<HTMLElement>) => {
//		evt.preventDefault();
//		handleClick(evt, currentPage + _pageNeighbours + 1);
//	};

//	if (!totalRecords || totalPages === 1) return null;
//	const pages = fetchPageNumbers();
//	return (
//		<Fragment>
//			<nav>
//				<ul className="pagination">
//					{pages.map((page, index) => {
//						if (page === LEFT_PAGE)
//							return (
//								<li key={index} className="page-item">
//									<a
//										className="page-link"
//										href="#"
//										aria-label="Previous"
//									>
//										<span
//											onClick={handleMoveLeft}
//											aria-hidden="true"
//										>
//											&laquo;
//										</span>
//									</a>
//								</li>
//							);

//						if (page === RIGHT_PAGE)
//							return (
//								<li key={index} className="page-item">
//									<a
//										className="page-link"
//										href="#"
//										aria-label="Next"
//									>
//										<span
//											onClick={handleMoveRight}
//											aria-hidden="true"
//										>
//											&raquo;
//										</span>
//									</a>
//								</li>
//							);

//						return (
//							<li
//								key={index}
//								className={`page-item${
//									currentPage === page ? ' active' : ''
//								}`}
//							>
//								<a
//									className="page-link"
//									href="#"
//									onClick={(
//										e: React.MouseEvent<HTMLElement>
//									) => handleClick(e, +page)}
//								>
//									{page}
//								</a>
//							</li>
//						);
//					})}
//				</ul>
//			</nav>
//		</Fragment>
//	);
//};

//export default Pagination;
