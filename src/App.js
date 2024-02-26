import React, { useState, useEffect } from 'react';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { getFilters } from './services/getFilters';

export const App = () => {
    const [filters, setFilters] = useState(null)

    useEffect(() => {
        async function getData() {
            setFilters(await getFilters());
        }
        getData();
    }, []);

    return (
        <div className='wrapper'>
            <ProductsPage filters={filters}/>
        </div>
    )
}