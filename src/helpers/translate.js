export function translate(fieldName) {
    const dictionary = new Map([
        ['product', 'Название'],
        ['brand', 'Бренд'],
        ['price', 'Цена'],
    ]);
    return dictionary.get(fieldName);
}