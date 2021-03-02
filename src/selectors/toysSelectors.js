import { createSelector } from 'reselect';
import { getGamesData } from 'utils/ToysUtils';
import { getGames } from 'selectors/commonSelectors';

export const gamesSelector = createSelector(
    getGames,
    getGamesData
)