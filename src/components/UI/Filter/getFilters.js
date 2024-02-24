import { requireToServer } from '../../../helpers/requireToServer';

// export async function getFilteredProducts() {
//     // const productIds = await getFilteredProductsList({"product": 'Золотое кольцо'});
//     // const productsList = await getProductsList(productIds.result)
//     const fields = await getFields({field: 'brand'});

// }


// async function getFilteredProductsList(filterParameter) {
//     return axios.post(url, {
//         action: 'filter',
//         params: filterParameter,
//     }, headers)
//     .then((response) => response.data)
//     .catch(e => {
//         if (e.message) console.log(e.message);
//         return getFilteredProductsList(filterParameter)
//     });
// }

async function getFilteringFields() {
    return requireToServer('get_fields');
}

async function getFilteringValues(field) {
    return requireToServer('get_fields', {field}); 
}

export async function getFilters() {
    const filters = {};

    const filteringFields = await getFilteringFields();

    filteringFields.result.forEach(async field => {
        const filteringValues = await getFilteringValues(field)
        const uniqFilteringValuesList = filteringValues.result.filter((value, index, values) => (values.indexOf(value) === index));
        filters[field] = uniqFilteringValuesList;
    });

    return filters;
}