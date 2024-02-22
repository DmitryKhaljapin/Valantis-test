import axios from 'axios';
import md5 from 'md5';

export async function getProducts() {
    const date = new Date();
    const authDate = `${date.getUTCFullYear()}${new Intl.DateTimeFormat('en-US', {month: '2-digit'}).format(date)}${date.getUTCDate()}`
    const password = 'Valantis'
    const authPassword = md5(`${password}_${authDate}`);


    const url = 'http://api.valantis.store:40000/';
    const body = {
        action: 'get_ids',
	    params: {offset: 0, limit: 51}

    }
    const headers = {
        headers: {
            'X-Auth': authPassword
        }
    }

    const { data: productIds } = await axios.post(url, body, headers);

    const { data: products } = await axios.post(url, {
        action: 'get_items',
        params: {ids: productIds.result}
    }, headers);

    const uniqProductsList = [...new Map(products.result.map(product => [product.id, product])).values()];

    console.log(uniqProductsList);
}