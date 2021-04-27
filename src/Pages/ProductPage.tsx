import React, { useState } from 'react';
import { Product, CartProduct } from '../App';

interface IProps {
	product: Product;
	onClick: ({ id, quantity }: CartProduct) => void;
}

export const ProductPage: React.FC<IProps> = ({ product, onClick }: IProps) => {
	const [quantity, setQuantity] = useState(1);
	const id = product.id;
	return (
		<>
			<div className="product-page">
				<div className="product-item">
					<h2>{product.title}</h2>
					<div>
						<div className="product-image">
							<img src={product.image} width="100"></img>
						</div>
						<div className="product-controls">
							<p>{product.price} €</p>
							<div>
								<div className="units">
									<label htmlFor="quantity">Quantity: </label>
									<input
										type="number"
										placeholder="1"
										min="1"
										max="100"
										id="quantity"
										onInput={(e) => {
											const value = +(e.target as HTMLInputElement)
												.value;
											setQuantity(value);
										}}
									/>
								</div>
								<button
									onClick={() => onClick({ id, quantity })}
									className="add-to-cart"
								>
									Add to cart
								</button>
								<p>More in {product.category} category...</p>
							</div>
						</div>
					</div>
					<p>
						<strong>Description: </strong>
						{product.description}
					</p>
				</div>
			</div>
		</>
	);
};
