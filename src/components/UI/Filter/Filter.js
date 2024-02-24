import React,  {useState, useEffect} from 'react';
import { sort } from '../../../helpers/sort';
import { Card } from '../Card/Card';
import { getFilters } from './getFilters';
import styles from './Filter.module.css';
import cn from 'classnames';

export const Filter = ({className}) => {
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        async function getData() {
            setFilters(await getFilters());
        }
        getData();
    }, []);

    return (
        <Card className={cn(className, styles.card)}>
           {filters && <dl>
                {Object.entries(filters).map(([field, values]) =>  {
                    return (
                        <div key={field}>
                            <dt>{field}</dt>
                            <dd>
                                <select>
                                    {sort(values).map(value => <option key={value} value={value}>{value}</option>)}
                                </select>
                            </dd>
                        </div>
                    );
                })}
            </dl>}
        </Card>
    );
}
