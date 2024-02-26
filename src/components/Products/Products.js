import React, { useState, useEffect } from 'react';
import { Product } from '../Product/Product';
import { getProducts, getFilteredProducts } from '../../services';
import { Loading } from '../Loading/Loading';
import { ControlBar } from '../UI';
import styles from './Products.module.css';

export const Products = ({selectedFilter, pageNumber, setPageNumber}) => {

    const [productsList, setProductsList] = useState(null)


    function showNextPage() {
        setPageNumber(prevState => prevState + 1);
    }

    function showPreviousPage() {
        setPageNumber(prevState => prevState - 1);
    }

    useEffect(() => {
        async function getData() {
            if (selectedFilter) return setProductsList(await getFilteredProducts(selectedFilter, pageNumber))
            return setProductsList(await getProducts(pageNumber));
        }
        setProductsList(null);
        getData();
    }, [pageNumber, selectedFilter]);

    return (
        <div>
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