import React from 'react';
import { Link } from 'react-router-dom';
import { Product, Cart, CartProduct } from './App';

interface IProps {
    cart: Cart | any[];
    products: Product[];
    onClick: ({ id }: CartProduct) => void;
}

export const Home: React.FC<IProps> = ({ products, onClick }: IProps) => {
    return (
        <>
            <h1>Buy buy buy!</h1>
            <div className="products">
                {products.map((product) => {
                    const id = product.id;
                    return (
                        <div className="product" key={id}>
                            <Link to={`/${product.title}`}>
                                <p className="product-title">{product.title}</p>
                                <img src={product.image} width="100"></img>
                            </Link>
                            <div className="product-action">
                                <p>{product.price} €</p>
                                <button
                                    onClick={() => onClick({ id })}
                                    className="add-to-cart"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
