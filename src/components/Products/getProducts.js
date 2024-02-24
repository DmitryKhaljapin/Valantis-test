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

async function getProductIds(pageNumber) {
    const offset = (pageNumber - 1) * 50; 

    return axios.post(url, {
        action: 'get_ids',
        params: {offset, limit: 51} //getting 51 products to сheck whether it's the last page or not;
    }, headers)
    .then((response) => {
        const productIds = response.data.result;
        const isLastPage = productIds.length < 51;
        return {
            productIds,
            isLastPage
        }
    })
    .catch(e => {
        console.log(e.message);
        return getProducts(offset)
    });
}

async function getProductsList(productIds) {
    return axios.post(url, {
        action: 'get_items',
        params: {ids: productIds}
    }, headers)
    .then((response) => {return response.data})
    .catch(e => {
        console.log(e.message);
        return getProductsList(productIds)
    });
}

export async function getProducts(pageNumber) {

    const {productIds, isLastPage} = await getProductIds(pageNumber)
    
    const productsList = await getProductsList(productIds);

    const uniqProductsList = productsList.result.reduce((list, product) => {
        if (list.some(item => item.id === product.id)) return list;
        list.push(product);
        return list;
    }, []);

    return {
        uniqProductsList,
        isLastPage
    };
}