import { combineReducers } from "redux";
import legoReducer from "./lego";
import userReducer from "./user";

const rootReducer = combineReducers({
    lego: legoReducer,
    user: userReducer
});
export default rootReducer;