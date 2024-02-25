import React from 'react';
import { sort } from '../../../helpers/sort';
import { Card } from '../Card/Card';

import styles from './Filter.module.css';
import cn from 'classnames';

export const Filter = ({className, selectFilter, selectedFilter, filters}) => {
    
    function onSelectHandler(event, field) {
        selectFilter(event.target.value ? {field, value: event.target.value}: '')
    }

    return (
        <Card className={cn(className, styles.card)}>
           {filters && <dl>
                {Object.entries(filters).map(([field, values]) =>  {
                    return (
                        <div key={field}>
                            <dt>{field}</dt>
                            <dd>
                                <select onChange={event => onSelectHandler(event, field)} value={field == selectedFilter?.field ? selectedFilter.value : ''}>
                                    {[<option key={0} value={null}>{''}</option>, ...sort(values).map(value => <option key={value} value={value || 'null'}>{value ? value : 'Отсутствует'}</option>)]}
                                </select>
                            </dd>
                        </div>
                    );
                })}
            </dl>}
        </Card>
    );
}
