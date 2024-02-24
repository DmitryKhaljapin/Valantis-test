import axios from 'axios';
import md5 from 'md5';

const url = 'http://api.valantis.store:40000/';
const date = new Date();
const authDate = `${date.getUTCFullYear()}${new Intl.DateTimeFormat('en-US', {month: '2-digit'}).format(date)}${date.getUTCDate()}`
const password = 'Valantis'
const authPassword = md5(`${password}_${authDate}`);
const headers = {
    headers: {
        'X-Auth': authPassword
    }
}

let correctionOffset = 0; // in case of products count less then 50 after uqicialize
let correctionLimit = 0; // in case of products count less then 50 after uqicialize

async function getProductIds(pageNumber) {
    let offset = (pageNumber - 1) * 50 + correctionOffset; 

    return axios.post(url, {
        action: 'get_ids',
        params: {offset, limit: 51 + correctionLimit} //getting 51 products to сheck whether it's the last page or not;
    }, headers)
    .then((response) => {
        const productIds = response.data.result.slice(0, 50 + correctionLimit);
        const isLastPage = response.data.result.length < 51;
        return {
            productIds,
            isLastPage
        }
    })
    .catch(e => {
        if (e.message) console.log(e.message);
        return getProductIds(pageNumber);
    });
}

async function getProductsList(productIds) {
    return axios.post(url, {
        action: 'get_items',
        params: {ids: productIds}
    }, headers)
    .then((response) => response.data)
    .catch(e => {
        if (e.message) console.log(e.message);
        return getProductsList(productIds)
    });
}

async function getFields(params) {

    const request = params ? {action: 'get_fields', params} : {action: 'get_fields'};

    return axios.post(url, request, headers)
    .then((response) => response.data)
    .catch(e => {
        if (e.message) console.log(e.message);
        return getFields()
    });
}

async function getFilteredProductsList(filterParameter) {
    return axios.post(url, {
        action: 'filter',
        params: filterParameter,
    }, headers)
    .then((response) => response.data)
    .catch(e => {
        if (e.message) console.log(e.message);
        return getFilteredProductsList(filterParameter)
    });
}

export async function getProducts(pageNumber) {
    const {productIds, isLastPage} = await getProductIds(pageNumber);
    
    const productsList = await getProductsList(productIds);

    const uniqProductsList = productsList.result.reduce((list, product) => { // reducing duplicats products
        if (list.some(item => item.id === product.id)) return list;
        list.push(product);
        return list;
    }, []);

    if (uniqProductsList.length < 50) { // correction in case of products count less then 50 after uqicialize
        correctionLimit++;
        return getProducts(pageNumber);
    }
    else {
        correctionOffset += correctionLimit;
        correctionLimit = 0;
        return {
            uniqProductsList,
            isLastPage
        };
    }
}

export async function getFilteredProducts() {
    // const productIds = await getFilteredProductsList({"product": 'Золотое кольцо'});
    // const productsList = await getProductsList(productIds.result)
    const fields = await getFields({field: 'brand'});

}

getFilteredProducts();