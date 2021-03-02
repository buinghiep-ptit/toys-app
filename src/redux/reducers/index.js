import { combineReducers } from "redux";
import toysReducers from "./toysReducers";
import routerReducers from "./routerReducers";

const rootReducer = combineReducers({
    games: toysReducers,
    router: routerReducers
});
export default rootReducer;