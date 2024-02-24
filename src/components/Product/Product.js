import React from 'react';
import { Card } from '../UI/Card/Card';
import styles from './Product.module.css';

export const Product = ({id, price, brand, product: title}) => {
    return (
        <Card>
            <dl className={styles['info-list']}>
                <dt></dt>
                <dd className={styles.title}>{title}</dd>

                <dt></dt>
                <dd className={styles.price}>$ {new Intl.NumberFormat('en-US').format(price)}</dd>

                <dt className={styles['prop-name']}>ID:</dt>
                <dd className={styles['prop-value']}>{id}</dd>

                <dt className={styles['prop-name']}>Бренд:</dt>
                <dd className={styles['prop-value']}>{brand}</dd>
            </dl>
        </Card>
    );
}