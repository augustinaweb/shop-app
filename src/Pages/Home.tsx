import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Cart, CartProduct } from '../App';
import Pagination from '../Components/Pagination';

interface IProps {
    cart: Cart | any[];
    products: Product[];
    onClick: ({ id }: CartProduct) => void;
}

export const Home: React.FC<IProps> = ({ products, onClick }: IProps) => {
    const [allProducts, setAllProducts] = useState(products);
    const [currentProducts, setCurrentProducts] = useState([] as any);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    const onPageChange = (data: any) => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentProducts = allProducts.slice(offset, offset + pageLimit);

        setCurrentPage(currentPage);
        setCurrentProducts(currentProducts);
        setTotalPages(totalPages);

        return currentPage;
    };

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
                            </Link>
                            <Link to={`/${product.title}`}>
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
            <Pagination
                totalRecords={products.length}
                pageLimit={6}
                pageNeighbours={1}
                onPageChange={onPageChange}
            />
        </>
    );
};
