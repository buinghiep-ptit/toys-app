import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_ERROR,
    SEARCH_GAMES_REQUEST
} from 'constants/actionTypes';
import gameApi from 'api/toyApi';

export const gamesFetchRequest = () => ({
    type: FETCH_GAMES_REQUEST,
    payload: {}
});

export const gamesFetchSuccess = (fetchedData) => ({
    type: FETCH_GAMES_SUCCESS,
    payload: { fetchedData }
});
export const gamesFetchError = (message) => ({
    type: FETCH_GAMES_ERROR,
    payload: { message }
});

export const fetchGames = (params) => async dispatch => {
    try {
        dispatch(gamesFetchRequest());
        const data = await gameApi.getGames(params);
        const { results } = data;
        const games = [];

        [...results].map(res => games.push({ ...res, modelUrl: "https://upload-test.foxpay.vn/media/file/inside/2021/01/15/12/league_of_legends_-_aatrox.zip" }))

        console.log('GAMES: ', games);
        dispatch(gamesFetchSuccess(games));
    } catch (err) {
        dispatch(gamesFetchSuccess([]));
        dispatch(gamesFetchError(err));
    };
}
export const searchGamesRequest = () => ({
    type: SEARCH_GAMES_REQUEST
})