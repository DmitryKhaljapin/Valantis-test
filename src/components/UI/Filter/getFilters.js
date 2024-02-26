import { requireToServer } from '../../../helpers/requireToServer';

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

    for await (const fieldAndValues of getFilteringValues(filteringFields.result)) {
        filters[fieldAndValues[0]] = fieldAndValues[1];
    }

    return filters;
}