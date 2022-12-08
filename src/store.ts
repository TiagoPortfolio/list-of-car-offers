import { configureStore } from "@reduxjs/toolkit";
import offersListReducer from "./modules/Offers/Filters/slice";

export const store = configureStore({
  reducer: {
    offersList: offersListReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
