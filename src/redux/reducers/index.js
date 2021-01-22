import { combineReducers } from "redux";
import toysReducers from "./toysReducers";
import usersReducers from "./usersReducers";

const rootReducer = combineReducers({
    toys: toysReducers,
    users: usersReducers
});
export default rootReducer;