import {
    FETCH_TOYS_REQUEST,
    FETCH_TOYS_SUCCESS,
    FETCH_TOYS_ERROR
} from 'constants/actionTypes';
import toyApi from 'api/toyApi';

export const toysFetchRequest = () => ({
    type: FETCH_TOYS_REQUEST,
    payload: {}
});

export const toysFetchSuccess = (fetchedData) => ({
    type: FETCH_TOYS_SUCCESS,
    payload: { fetchedData }
});
export const toysFetchError = (message) => ({
    type: FETCH_TOYS_ERROR,
    payload: { message }
});

export const fetchToys = (filters) => async dispatch => {
    try {
        dispatch(toysFetchRequest());
        const results = await toyApi.getAll(filters);
        dispatch(toysFetchSuccess(results));
    } catch (err) {
        dispatch(toysFetchError(err.message));
    };
}

export const fetchToysIfNeeded = (filters) => async dispatch => {
    if (true) {
        dispatch(fetchToys(filters));
    }
};
