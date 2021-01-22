import { pathToRegexp, compile } from 'path-to-regexp';


const INDEX_PATH = '/';
const GAMES_PATH = '/games';
const GAME_PATH = '/games/:slug';
const USER_PATH = '/@:username';

const paths = [INDEX_PATH, GAMES_PATH, GAME_PATH, USER_PATH];

export const getPathMatch = (paths, pathname) => {
    return paths
        .map(path => {
            const keys = [];
            const regexp = pathToRegexp(path, keys);
            return { path, regexp, keys };
        })
        .find(path => path.regexp.test(pathname));
};

