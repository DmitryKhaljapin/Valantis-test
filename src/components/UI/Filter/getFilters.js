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

async function* getFilteringValues(fields) {
    for (const field of fields) {
        const values = await requireToServer('get_fields', {field});
        const uniqValues = values.result.filter((value, index, values) => values.indexOf(value) === index);

        yield [field, uniqValues];
    }
}

export async function getFilters() {
    const filters = {};

    const filteringFields = await getFilteringFields();

    const filteringValues = getFilteringValues(filteringFields.result);
    for await (const fieldAndValues of filteringValues) {
        filters[fieldAndValues[0]] = fieldAndValues[1];
    }

    return filters;
}