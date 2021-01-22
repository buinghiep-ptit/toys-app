import { createSelector } from 'reselect';
import { getToys } from './commonSelectors';

export const selectToys = createSelector(
    [getToys],
    getToys => getToys.data,
);

export const selectToysCount = createSelector(
    [selectToys],
    selectToys => selectToys.length,
);
