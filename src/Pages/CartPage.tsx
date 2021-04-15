import React, { FC } from 'react';
import { Cart, Product } from '../App';

interface IProps {
    cart: Cart | any[];
    products: Product[];
}

const CartPage: FC<IProps> = ({ cart, products }: IProps) => {
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
                {/*{cart.map((product: any, i: number) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{products[i].title}</td>
                            <td>
                                <img src={products[i].image} width="100"></img>
                            </td>
                            <td>{product.quantity}</td>
                        </tr>
                    );
                })}*/}
            </table>
        </>
    );
};

export default CartPage;
