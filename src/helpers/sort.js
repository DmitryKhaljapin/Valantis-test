export function sort(array) {
    if (typeof array[0] === 'number') return array.sort((item1, item2) => item1 - item2);
    return array.sort();
}