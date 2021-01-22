import {
    FETCH_TOYS_REQUEST,
    FETCH_TOYS_SUCCESS,
    FETCH_TOYS_ERROR
} from 'constants/actionTypes';

const initialState = {
    loading: false,
    success: false,
    message: null,
    data: [],
};

const toysReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_TOYS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TOYS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: payload.fetchedData.data.toyDTOList,
            };
        case FETCH_TOYS_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                message: payload.message,
            };

        default:
            return state;
    }
};
export default toysReducer;