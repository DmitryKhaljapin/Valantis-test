import { requireToServer } from '../../helpers/requireToServer';

let correctionOffset = 0; // in case of products count less then 50 after uqicialize
let correctionLimit = 0; // in case of products count less then 50 after uqicialize

async function getProductIds(pageNumber) {
    let offset = (pageNumber - 1) * 50 + correctionOffset;
    
    const response = await requireToServer('get_ids', {offset, limit: 51 + correctionLimit});
    const productIds = response.result.slice(0, 50 + correctionLimit);
    const isLastPage = response.result.length < 51;
    return {
        productIds,
        isLastPage
    }
}

async function getProductsList(productIds) {
    return await requireToServer('get_items', {ids: productIds});
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