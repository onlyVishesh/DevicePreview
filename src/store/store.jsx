import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "store/reducers/index.jsx";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [], // Add any actions that contain non-serializable data if needed
      },
    }),
});

export default store;
