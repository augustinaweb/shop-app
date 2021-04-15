import React from 'react';
import cartIcon from '../images/shopping-cart.png';
import { Link } from 'react-router-dom';

interface IProps {
    total: number;
}

export const Header: React.FC<IProps> = ({ total }: IProps) => {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/">#Shopshopshop</Link>
            </div>
            <div className="action">
                <Link to="/cart">
                    <p className="number">{total}</p>
                    <img src={cartIcon} width="30" />
                </Link>
            </div>
        </div>
    );
};
