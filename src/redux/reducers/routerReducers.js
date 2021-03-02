import { CHANGE_ROUTER } from 'constants/actionTypes';

const initialState = {
    router: {
        path: null,
        options: {
            query: null,
            page: 1,
            page_size: 20
        },
    }
};

function router(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_ROUTER:
            return {
                ...state,
                router: payload.router
            };
        default:
            return state;
    }
}

export default router;
