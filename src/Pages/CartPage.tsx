import React, { FC } from 'react';
import { CartProduct, Product } from '../App';

interface IProps {
	cart: CartProduct[];
	products: Product[];
	total: number;
}

const CartPage: FC<IProps> = ({ cart, products, total }: IProps) => {
	console.log(cart);
	//const totalPrice = reduce.cart
	return (
		<>
			<h2>Cart!</h2>
			<table className="cart-table">
				<tr>
					<th>No</th>
					<th>Product</th>
					<th></th>
					<th>Price</th>
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
							<td>{products[index].price} €</td>
							<td>{product.quantity}</td>
						</tr>
					);
				})}
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td>totalPrice €</td>
					<td>{total}</td>
				</tr>
			</table>
		</>
	);
};

export default CartPage;
