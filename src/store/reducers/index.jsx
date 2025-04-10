/** Dependencies */
import { combineReducers } from "@reduxjs/toolkit";

/** Reducer */
import screensReducer from "./screenReducer.jsx";

const rootReducer = combineReducers({
  screens: screensReducer,
});

export default rootReducer;
