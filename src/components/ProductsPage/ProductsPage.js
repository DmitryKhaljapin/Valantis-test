import React from 'react';
import { Products } from '../Products/Products';
import { Filter } from '../UI/Filter/Filter';
import styles from './ProductsPage.module.css';

export const ProductsPage = ({filters}) => {
    return (
        <div className={styles.wrapper}>
            <Filter filters={filters} />
            <Products />    
        </div>
    )
}