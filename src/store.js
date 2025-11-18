import { configureStore } from "@reduxjs/toolkit";
import carReduer from "./CatSlice/carslice.jsx";
import toggleReducer from "./toggleSlice/toggleslice.jsx";
export const store = configureStore({
  reducer: {
    car: carReduer,
    toggle: toggleReducer
  },
});
