import React, { useState, useEffect } from 'react';
import { Product } from '../Product/Product';
import { getProducts } from './getProducts';
import { ControlBar } from '../UI/ControlBar/ControlBar';
import styles from './Products.module.css';

export const Products = () => {

    const [productsList, setProductsList] = useState(null)
    const [pageNumber, setPageNumber] = useState(1);

    function showNextPage() {
        setPageNumber(prevState => prevState + 1);
    }

    function showPreviousPage() {
        setPageNumber(prevState => prevState - 1);
    }

    useEffect(() => {
        async function getData() {
            setProductsList(await getProducts(0));
        }
        if (productsList) return ;
        getData();
    }, []);

    return (
        <div className={styles['products-container']}>
            {productsList && <>
                <ul>
                    {productsList.uniqProductsList.map(productItem => <li key={productItem.id}><Product  id={productItem.id} brand={productItem.brand} product={productItem.product} price={productItem.price} /></li>)}
                </ul>
                <ControlBar showNextPage={showNextPage} showPreviousPage={showPreviousPage} pageNumber={pageNumber} isLastPage={productsList.isLastPage} />
            </>}
        </div>
    )
}