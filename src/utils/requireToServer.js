import axios from 'axios';
import md5 from 'md5';

const url = 'http://api.valantis.store:40000/';
const date = new Date();
const authDate = `${date.getUTCFullYear()}${new Intl.DateTimeFormat('en-US', {month: '2-digit'}).format(date)}${new Intl.DateTimeFormat('en-US', {day: '2-digit'}).format(date)}`
const password = 'Valantis'
const authPassword = md5(`${password}_${authDate}`);
const headers = {
    headers: {
        'X-Auth': authPassword
    }
}

export async function requireToServer(action, params) {
    const requestBody = params ? {action, params} : {action};

    return axios.post(url, requestBody, headers)
    .then((response) => response.data)
    .catch(e => {
        if (e.message) console.log(e.message);
        return requireToServer(action, params);
    });
}