import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, CartProduct } from '../App';
import Pagination from '../Components/Pagination';

interface IProps {
	products: Product[];
	onClick: ({ id, quantity }: CartProduct) => void;
}

export const Home: React.FC<IProps> = ({ products, onClick }: IProps) => {
	const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

	const handlePageChange = (currentPage: number, pageLimit: number) => {
		setCurrentProducts(
			products.slice(
				(currentPage - 1) * pageLimit,
				currentPage * pageLimit
			)
		);
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
				pageLimit={3}
				pageNeighbours={1}
				className="pagination"
				handlePageChange={handlePageChange}
			/>
			{/*<Pagination
				pageLimit={3}
				pageNeighbours={1}
				className="pagination"
				setCurrentProducts={setCurrentProducts}
				products={products}
			/>*/}
		</>
	);
};
