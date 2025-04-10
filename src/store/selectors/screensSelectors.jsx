/** Dependencies */
import { createSelector } from "reselect";

const screensStateSelector = (state) => state.screens;

export const setScreensSelector = createSelector(
  screensStateSelector,
  (screenState) => screenState?.screens
);

export default screensStateSelector;
