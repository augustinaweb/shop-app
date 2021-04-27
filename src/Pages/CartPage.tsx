import React, { FC } from 'react';
import { CartProduct, Product } from '../App';

interface IProps {
	cart: CartProduct[];
	products: Product[];
}

const CartPage: FC<IProps> = ({ cart, products }: IProps) => {
	console.log(cart);
	return (
		<>
			<h2>Cart!</h2>
			<table className="cart-table">
				<tr>
					<th>No</th>
					<th>Product</th>
					<th>Image</th>
					<th>Quantity</th>
				</tr>
				{cart.map((product, i: number) => {
					const index = products.findIndex(
						(element) => element.id === product.id
					);
					return (
						<tr key={product.id}>
							<td>{i + 1}</td>
							<td>{products[index].title}</td>
							<td>
								<img
									src={products[index].image}
									width="100"
								></img>
							</td>
							<td>{product.quantity}</td>
						</tr>
					);
				})}
			</table>
		</>
	);
};

export default CartPage;
