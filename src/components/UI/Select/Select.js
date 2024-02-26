import React from 'react';
import styles from './Select.module.css';
import { sort } from '../../../utils/sort';

export const Select = ({optionsContent, ...props}) => {
    return (
        <select className={styles.select} {...props}>
            {[<option key={0} value={null}>{''}</option>, ...sort(optionsContent).map(optionContent => <option key={optionContent} value={optionContent || 'null'}>{optionContent ? optionContent : 'Отсутствует'}</option>)]}
        </select>
    )
}