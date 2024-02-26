import React, { useState } from 'react';
import { Products } from '../Products/Products';
import { Filter } from '../UI';
import styles from './ProductsPage.module.css';

export const ProductsPage = ({filters}) => {

    const [selectedFilter, setSelectedFilter] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div className={styles.wrapper}>
            <Filter setSelectedFilter={setSelectedFilter} setPageNumber={setPageNumber} selectedFilter={selectedFilter} filters={filters} />
            <Products selectedFilter={selectedFilter} pageNumber={pageNumber} setPageNumber={setPageNumber} />    
        </div>
    )
}