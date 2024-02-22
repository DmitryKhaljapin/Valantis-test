import React from 'react';
import { Button } from '../Button/Button'
import styles from './ControlBar.module.css';

export const ControlBar = ({pageNumber, showNextPage, showPreviousPage}) => {
   return(
        <div className={styles['control-bar']}>
            <Button isDisabled={true} onClick={showPreviousPage} />
            <p className={styles['page-number']}>{pageNumber}</p>
            <Button onClick={showNextPage} />
        </div>
   );
}