import loginReducer from "./login";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  loginReducer
});

export default allReducer;