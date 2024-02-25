import React, { useState } from 'react';
import { Products } from '../Products/Products';
import { Filter } from '../UI/Filter/Filter';
import styles from './ProductsPage.module.css';

export const ProductsPage = ({filters}) => {

    const [selectedFilter, setSelectedFilter] = useState('');

    return (
        <div className={styles.wrapper}>
            <Filter selectFilter={setSelectedFilter} selectedFilter={selectedFilter} filters={filters} />
            <Products selectedFilter={selectedFilter} />    
        </div>
    )
}