import React, { useState, useEffect } from 'react';
import { Product } from '../Product/Product';
import { getProducts } from './getProducts';
import styles from './Products.module.css';

export const Products = () => {

    const [productsList, setProductsList] = useState(null)

    useEffect(() => {
        async function getData() {
            setProductsList(await getProducts(0));
        }
        if (productsList) return ;
        getData();
    }, []);

    return (
        <div className={styles['products-container']}>
            {productsList && productsList.map(productItem => <Product key={productItem.id} id={productItem.id} brand={productItem.brand} product={productItem.product} price={productItem.price} />)}
        </div>
    )
}