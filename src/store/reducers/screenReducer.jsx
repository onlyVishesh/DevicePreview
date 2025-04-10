/** Dependencies */
import { createSlice } from "@reduxjs/toolkit";

/** Store */
import Screens from "data/screens.js";

// Load saved screens and custom screens from localStorage
const loadSavedState = () => {
  try {
    const savedScreens = localStorage.getItem("selectedScreens");
    const customScreens = localStorage.getItem("customScreens");

    let screens = [...Screens];

    // Add custom screens if they exist
    if (customScreens) {
      const parsedCustomScreens = JSON.parse(customScreens);
      screens = [...screens, ...parsedCustomScreens];
    }

    // Apply saved selections if they exist
    if (savedScreens) {
      const selectedScreenNames = JSON.parse(savedScreens);
      screens = screens.map((screen) => ({
        ...screen,
        checked: selectedScreenNames.includes(screen.deviceName),
      }));
    }

    return screens;
  } catch (error) {
    console.error("Error loading saved state:", error);
    return Screens;
  }
};

const initialState = {
  screens: loadSavedState(),
};

const screensSlice = createSlice({
  name: "screens",
  initialState,
  reducers: {
    setScreens: (state, action) => {
      state.screens = action.payload;
      // Save selected screens to localStorage
      const selectedScreens = action.payload
        .filter((screen) => screen.checked)
        .map((screen) => screen.deviceName);
      localStorage.setItem("selectedScreens", JSON.stringify(selectedScreens));
    },
    addCustomScreen: (state, action) => {
      const newScreen = {
        ...action.payload,
        checked: false,
        DPR: action.payload.DPR || 1,
        userAgent: action.payload.userAgent || "",
      };
      state.screens.push(newScreen);

      // Save custom screens to localStorage
      const customScreens = state.screens.filter(
        (screen) =>
          !Screens.some(
            (defaultScreen) => defaultScreen.deviceName === screen.deviceName
          )
      );
      localStorage.setItem("customScreens", JSON.stringify(customScreens));
    },
    removeCustomScreen: (state, action) => {
      const screenToRemove = action.payload;
      state.screens = state.screens.filter(
        (screen) => screen.deviceName !== screenToRemove
      );

      // Update localStorage - remove from custom screens
      const customScreens = state.screens.filter(
        (screen) =>
          !Screens.some(
            (defaultScreen) => defaultScreen.deviceName === screen.deviceName
          )
      );
      localStorage.setItem("customScreens", JSON.stringify(customScreens));

      // Update selected screens in localStorage
      const selectedScreens = state.screens
        .filter((screen) => screen.checked)
        .map((screen) => screen.deviceName);
      localStorage.setItem("selectedScreens", JSON.stringify(selectedScreens));
    },
  },
});

export const { setScreens, addCustomScreen, removeCustomScreen } =
  screensSlice.actions;
export { initialState };
export default screensSlice.reducer;
