import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Components/Header';
import { Home } from './Pages/Home';
import { ProductPage } from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export interface Product {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	title: string;
}

export interface CartProduct {
	id: number;
	quantity: number;
}

const App: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [cart, setCart] = useState<CartProduct[]>([]);
	//immediately invoked function
	const total = (() =>
		cart.reduce((accumulator, currrentValue): number => {
			//console.log(accumulator, currrentValue);
			return accumulator + currrentValue.quantity;
		}, 0))();

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((res) => res.json())
			.then((res) => {
				setProducts([...res, ...res]);
				setIsLoaded(true);
			})
			.catch((error) => {
				setError(error);
				setIsLoaded(true);
			});
	}, []);

	const handleAddItem = ({ id, quantity }: CartProduct) => {
		const currentCart = cart.slice();
		const index = currentCart.findIndex((product) => product.id === id);
		if (index > -1) {
			const currentQuantity = currentCart[index].quantity;
			const newQuantity = currentQuantity + quantity;
			currentCart[index].quantity = newQuantity;
			setCart(currentCart);
			return;
		}
		const addedCartProduct = {
			// galima sutrumpinti, kai key ir value sutampa. (quantity ?? 1)
			id,
			quantity
		};
		setCart(currentCart.concat(addedCartProduct));
	};

	const handleRemoveItem = (id: number) => {
		const currentCart = cart.slice();
		setCart(currentCart.filter((el) => el.id !== id));
	};

	if (error) {
		return <div>Error: {error}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<Router>
				<div className="app">
					<Header total={total} />
					<Switch>
						<Route exact path="/">
							<Home products={products} onClick={handleAddItem} />
						</Route>
						<Route path="/cart">
							<CartPage
								cart={cart}
								products={products}
								total={total}
								handleRemoveItem={handleRemoveItem}
							/>
						</Route>
						<Route
							path="/:product"
							render={({ match }) => {
								const product = products.find(
									(p) => `${p.id}` === match.params.product
								);
								if (product) {
									return (
										<ProductPage
											onClick={handleAddItem}
											product={product}
										/>
									);
								}
								return null;
							}}
						></Route>
					</Switch>
				</div>
			</Router>
		);
	}
};

export default App;
