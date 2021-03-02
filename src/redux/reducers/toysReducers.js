import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_ERROR,
    SEARCH_GAMES_REQUEST
} from 'constants/actionTypes';
const initialState = {
    loading: true,
    success: false,
    message: null,
    data: [],
    hasMore: false
};

const gamesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_GAMES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: [...state.data, ...payload.fetchedData],
                hasMore: !!payload.fetchedData.length
            };
        case FETCH_GAMES_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                message: payload.message,
            };

        case SEARCH_GAMES_REQUEST:
            return {
                ...state,
                loading: false,
                data: [],
            };


        default:
            return state;
    }
};
export default gamesReducer;