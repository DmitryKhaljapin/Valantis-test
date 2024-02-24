import React from 'react';
import styles from './Loading.module.css';

export const Loading = () => {
    return (
        <div className={styles['lds-container']}>
            <div className={styles['lds-ring']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}