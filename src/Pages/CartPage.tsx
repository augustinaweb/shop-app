import React, { FC } from 'react';
import { CartProduct, Product } from '../App';
import trashIcon from '../images/delete.png';

interface IProps {
	cart: CartProduct[];
	products: Product[];
	total: number;
	handleRemoveItem: (id: number) => void;
}

const CartPage: FC<IProps> = ({
	cart,
	products,
	total,
	handleRemoveItem
}: IProps) => {
	console.log(cart);
	const totalPrice = cart.reduce((accumulator, currentValue): any => {
		const product = products.find((el) => el.id === currentValue.id);
		if (product) {
			return accumulator + product.price * currentValue.quantity;
		}
	}, 0);

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
					<th>Remove</th>
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
							<td>
								<img
									className="delete"
									src={trashIcon}
									onClick={() => handleRemoveItem(product.id)}
								></img>
							</td>
						</tr>
					);
				})}
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td>{totalPrice} €</td>
					<td>{total}</td>
					<td></td>
				</tr>
			</table>
		</>
	);
};

export default CartPage;
