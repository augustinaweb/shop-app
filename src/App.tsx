import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { Home } from './Home';
import { ProductPage } from './ProductPage';
import CartPage from './CartPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
}

export interface Cart {
    total: number;
    cartProducts: CartProduct[];
}

export interface CartProduct {
    id: number;
    quantity?: number;
}

export interface Test {
    id: number;
    quantity: number;
}

const App: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({ cartProducts: [] as any, total: 0 });

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((res) => {
                setProducts(res);
                setIsLoaded(true);
                console.log(res);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, []);

    const handleAddItem = ({ id, quantity }: CartProduct) => {
        const currentCart = cart.cartProducts.slice();
        const index = currentCart.findIndex(
            (product: CartProduct) => product.id === id
        );
        console.log(index);
        /* const newCart = () => {
            if (index >= 0) {
                //const currentQuantity = currentCart[index].quantity;
                //currentCart[index].quantity = quantity ?? currentQuantity + 1;
				currentCart[index].quantity = 5;
                return currentCart;
            }
            const currentCartProduct = {
                // id: id,
                id, // galima sutrumpinti, kai key ir value sutampa
                // quantity: quantity ? quantity : 1
                quantity: quantity ?? 1
            };
            return currentCart.concat(currentCartProduct);
        };*/
        const currentCartProduct = {
            // id: id,
            id, // galima sutrumpinti, kai key ir value sutampa
            // quantity: quantity ? quantity : 1
            quantity: quantity ?? 1
        };
        const newCart = currentCart.concat(currentCartProduct);

        //const newTotal = (newCart: Test[]) =>
        //    newCart.reduce((acc, cur): number => {
        //        return acc + cur.quantity;
        //    }, 0);
        const currentTotal = cart.total;
        const newTotal = currentTotal + 1;

        setCart({
            cartProducts: newCart,
            total: newTotal
        });
        console.log(newCart);
        //console.log(newTotal);
    };

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Router>
                <div className="app">
                    <Header total={cart.total} />
                    <Switch>
                        <Route exact path="/">
                            <Home
                                cart={cart as Cart | any[]}
                                products={products}
                                onClick={handleAddItem}
                            />
                        </Route>
                        <Route path="/cart">
                            <CartPage
                                cart={cart as Cart | any[]}
                                products={products}
                            />
                        </Route>
                        <Route
                            path="/:product"
                            render={({ match }) => (
                                <ProductPage
                                    onClick={handleAddItem}
                                    cart={cart as Cart | any[]}
                                    product={(products as
                                        | Product[]
                                        | any[]).find(
                                        (p) => p.title === match.params.product
                                    )}
                                />
                            )}
                        ></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
};

export default App;
