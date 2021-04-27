import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, CartProduct } from '../App';
import Pagination from '../Components/Pagination';

interface IProps {
	products: Product[];
	onClick: ({ id, quantity }: CartProduct) => void;
}

interface OnPageChange {
	selectedPage: number;
	pageLimit: number;
}

export const Home: React.FC<IProps> = ({ products, onClick }: IProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

	const onPageChange = ({ selectedPage, pageLimit }: OnPageChange) => {
		const offset = (currentPage - 1) * pageLimit;
		const newCurrentProducts = products.slice(offset, offset + pageLimit);
		setCurrentProducts(newCurrentProducts);
		setCurrentPage(selectedPage);
	};

	return (
		<>
			<h1>Buy buy buy!</h1>
			<div className="products">
				{currentProducts.map((product) => {
					const id = product.id;
					const quantity = 1;
					return (
						<div className="product" key={id}>
							<Link to={`/${product.id}`}>
								<p className="product-title">{product.title}</p>
							</Link>
							<Link to={`/${product.id}`}>
								<img src={product.image} width="100"></img>
							</Link>
							<div className="product-action">
								<p>{product.price} €</p>
								<button
									onClick={() => onClick({ id, quantity })}
									className="add-to-cart"
								>
									Add to cart
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<Pagination
				totalRecords={products.length}
				pageLimit={2}
				pageNeighbours={1}
				onPageChange={onPageChange}
				currentPage={currentPage}
				//onClick={() => {
				//	console.log('test');
				//}}
			/>
		</>
	);
};
