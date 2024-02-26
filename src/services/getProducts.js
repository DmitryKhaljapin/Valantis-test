import { requireToServer } from '../utils/requireToServer';
import { storedFilteredProductIds } from '../data/storedFilteredProductIds';

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

async function getFilteredProductIds(selectedFilter) {
    const params = selectedFilter.field === 'price' ? {[selectedFilter.field]: Number(selectedFilter.value + '.0')} : {[selectedFilter.field]: selectedFilter.value === 'null' ? null : selectedFilter.value};

    const filteredProductIds = await requireToServer('filter', params);

    if (filteredProductIds.result.length > 50) { //  in case of product's IDs count is more then 50 store product's IDs to avoid sending request to server again
        storedFilteredProductIds = {filteredProductIds: filteredProductIds.result, selectedFilter};
        return  {
            filteredProductIds: filteredProductIds.result.slice(0, 50),
            isLastPage: false,
        }
    }

    return {
        filteredProductIds: filteredProductIds.result,
        isLastPage: true,
    }
}

function getFilteredProductIdsFromStore(pageNumber) {
    const start = (pageNumber - 1) * 50;
    const end = start + 50;
    let isLastPage = true;

    const filteredProductIds = storedFilteredProductIds.filteredProductIds.slice(start, end);
    
    if (storedFilteredProductIds.filteredProductIds[end + 1]) isLastPage = false;

    return {
        filteredProductIds,
        isLastPage,
    }
}

async function getProductsList(productIds) {
    return requireToServer('get_items', {ids: productIds});
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

export async function getFilteredProducts(selectedFilter, pageNumber) {
    correctionOffset = 0;
    let filteredProductIds, isLastPage;

    if (storedFilteredProductIds?.selectedFilter.field === selectedFilter.field 
        && storedFilteredProductIds?.selectedFilter.value === selectedFilter.value) {
            ({filteredProductIds, isLastPage} = getFilteredProductIdsFromStore(pageNumber));
        } else {
           ({filteredProductIds, isLastPage} = await getFilteredProductIds(selectedFilter));
        }

    const productsList = await getProductsList(filteredProductIds);

    const uniqProductsList = productsList.result.reduce((list, product) => { // reducing duplicats products
        if (list.some(item => item.id === product.id)) return list;
        list.push(product);
        return list;
    }, []);
    
    return {
        uniqProductsList,
        isLastPage
    }
}