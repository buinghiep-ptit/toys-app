import * as types from 'constants/actionTypes';
export const addNewLego = (lego) => {
    return {
        type: types.ADD_NEW_LEGO,
        payload: lego,
    };
};

export const setActiveLego = (lego) => {
    return {
        type: 'SET_ACTIVE_LEGO',
        payload: lego,
    };
};