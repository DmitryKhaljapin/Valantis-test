import React, { useState, useEffect } from 'react';
import { Product } from '../Product/Product';
import { getProducts } from './getProducts';
import { Loading } from '../Loading/Loading';
import { ControlBar } from '../UI/ControlBar/ControlBar';
import { Filter } from '../UI/Filter/Filter';
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
            setProductsList(await getProducts(pageNumber));
        }
        setProductsList(null);
        getData();
    }, [pageNumber]);

    return (
        <div className={styles['products-container']}>
            <Filter className={styles.filter} />
            {productsList 
            ?<>
                <ul>
                    {productsList.uniqProductsList.map(productItem => <li key={productItem.id}><Product  id={productItem.id} brand={productItem.brand} product={productItem.product} price={productItem.price} /></li>)}
                </ul>
                <ControlBar className={styles['control-bar']} showNextPage={showNextPage} showPreviousPage={showPreviousPage} pageNumber={pageNumber} isLastPage={productsList.isLastPage} />
            </>
            :<Loading />}
        </div>
    )
}