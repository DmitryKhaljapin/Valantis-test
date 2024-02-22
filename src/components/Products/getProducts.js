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

async function getProductIds(offset) {
    return axios.post(url, {
        action: 'get_ids',
        params: {offset: offset, limit: 50}
    }, headers)
    .then((response) => {return response.data})
    .catch(e => {
        console.log(e.message);
        return getProducts(offset)
    });
}

async function getProductsList(productIds) {
    return axios.post(url, {
        action: 'get_items',
        params: {ids: productIds.result}
    }, headers)
    .then((response) => {return response.data})
    .catch(e => {
        console.log(e.message);
        return getProductsList(productIds)
    });
}

export async function getProducts(offset) {

    const productIds = await getProductIds(offset)
    
    const productsList = await getProductsList(productIds);

    const uniqProductsList = productsList.result.reduce((list, product) => {
        if (list.some(item => item.id === product.id)) return list;
        list.push(product);
        return list;
    }, []);

    return uniqProductsList;
}