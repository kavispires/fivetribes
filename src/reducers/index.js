import { combineReducers } from "redux";

const rootReducer = combineReducers({
  app: require("./app").default,
  scorer: require("./scorer").default
});

export default rootReducer;
