import React,  {useState, useEffect} from 'react';
import { sort } from '../../../helpers/sort';
import { Card } from '../Card/Card';
import { getFilters } from './getFilters';
import styles from './Filter.module.css';
import cn from 'classnames';

export const Filter = ({className, filters}) => {
    return (
        <Card className={cn(className, styles.card)}>
           {filters && <dl>
                {Object.entries(filters).map(([field, values]) =>  {
                    return (
                        <div key={field}>
                            <dt>{field}</dt>
                            <dd>
                                <select>
                                    {[<option key={0} value={null}>{''}</option>, ...sort(values).map(value => <option key={value} value={value}>{value? value: 'Отсутствует'}</option>)]}
                                </select>
                            </dd>
                        </div>
                    );
                })}
            </dl>}
        </Card>
    );
}