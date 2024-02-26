import React from 'react';
import { Button } from '../Button/Button'
import { Card } from '../Card/Card';
import { Select } from '../Select/Select';
import { translate } from '../../../utils/translate'

import styles from './Filter.module.css';
import cn from 'classnames';

export const Filter = ({className, setSelectedFilter, setPageNumber, selectedFilter, filters}) => {
    
    function selectFilter(event, field) {
        setPageNumber(1);
        setSelectedFilter(event.target.value ? {field, value: event.target.value}: '');
    }

    return (
        <>
            {filters &&<Card className={cn(className, styles.card)}>
                <dl>
                    {Object.entries(filters).map(([field, values]) =>  {
                        return (
                            <div className={styles['filter-item']} key={field}>
                                <dt className={styles.field}>{translate(field) + ':'}</dt>
                                <dd>
                                    <Select optionsContent={values} onChange={event => selectFilter(event, field)} value={field == selectedFilter?.field ? selectedFilter.value : ''}/>
                                </dd>
                            </div>
                        );
                    })}
                </dl>
                <Button onClick={selectFilter} className={styles['reset-button']}>{'Сбросить фильтр'}</Button>
            </Card>}
        </>
    );
}
