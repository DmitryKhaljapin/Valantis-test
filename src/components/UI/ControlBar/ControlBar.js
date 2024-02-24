import React from 'react';
import { Button } from '../Button/Button'
import styles from './ControlBar.module.css';

export const ControlBar = ({pageNumber, isLastPage, showNextPage, showPreviousPage}) => {
   return(
        <div className={styles['control-bar']}>
            <Button isDisabled={pageNumber === 1? true : false} onClick={showPreviousPage} />
            <p className={styles['page-number']}>{pageNumber}</p>
            <Button isDisabled={isLastPage} onClick={showNextPage} />
        </div>
   );
}