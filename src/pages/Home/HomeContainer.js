import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

/** Store */
import {
  addCustomScreen,
  removeCustomScreen,
  setScreens,
} from "store/actions/index.jsx";
import { setScreensSelector } from "store/selectors/index.jsx";

import Home from "./Home.jsx";

export const mapDispatchToProps = (dispatch) => ({
  setScreens: (data) => dispatch(setScreens(data)),
  addCustomScreen: (data) => dispatch(addCustomScreen(data)),
  removeCustomScreen: (deviceName) => dispatch(removeCustomScreen(deviceName)),
});

export const mapStateToProps = createStructuredSelector({
  screensValues: setScreensSelector,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
