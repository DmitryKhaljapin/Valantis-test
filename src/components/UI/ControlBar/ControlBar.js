import React from 'react';
import { Button } from '../Button/Button'
import styles from './ControlBar.module.css';
import cn from 'classnames';

export const ControlBar = ({pageNumber, isLastPage, showNextPage, showPreviousPage, className}) => {
   return(
        <div className={cn(styles['control-bar'], className)}>
            <Button isDisabled={pageNumber === 1? true : false} onClick={showPreviousPage} />
            <p className={styles['page-number']}>{pageNumber}</p>
            <Button isDisabled={isLastPage} onClick={showNextPage} />
        </div>
   );
}