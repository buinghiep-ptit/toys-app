import { CHANGE_ROUTER } from 'constants/actionTypes';

export const changeRouter = router => ({
    type: CHANGE_ROUTER,
    payload: { router }
});
export const initRouter = () => async dispatch => {

    const hash = window.location.hash ? window.location.hash.slice(1) : '';
    const [pathname, search] = hash.split('?');
    const router = search ? parseQuery(search) : { query: 'raider', page: 1 };
    dispatch(changeRouter({ path: pathname, options: { ...router, page: 1, page_size: 20 } }));
};

const parseQuery = search => {
    return search
        .split('&')
        .map(pair => pair.split('='))
        .filter(keyValuePair => keyValuePair.length === 2 && keyValuePair[0] !== '')
        .reduce(
            (obj, keyValuePair) => ({ ...obj, [keyValuePair[0]]: keyValuePair[1] }),
            {}
        );
}