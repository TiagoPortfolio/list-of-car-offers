import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../../store";

export type OffersFiltersState = {
  searchTerm: "";
  orderBy: "NAME" | "PRICE";
  priceRange: null | [number, number];
};

const initialState: OffersFiltersState = {
  searchTerm: "",
  orderBy: "NAME",
  priceRange: null,
};

export const offersListSlice = createSlice({
  name: "offersList",
  initialState,
  reducers: {
    changedSearchTermFilter: (
      state,
      { payload: searchTerm }: PayloadAction<OffersFiltersState["searchTerm"]>
    ) => {
      state.searchTerm = searchTerm;
    },
    changedOrderByFilter: (
      state,
      { payload: orderBy }: PayloadAction<OffersFiltersState["orderBy"]>
    ) => {
      state.orderBy = orderBy;
    },
    changedPriceRangeFilter: (
      state,
      { payload: priceRange }: PayloadAction<OffersFiltersState["priceRange"]>
    ) => {
      state.priceRange = priceRange;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changedSearchTermFilter,
  changedOrderByFilter,
  changedPriceRangeFilter,
} = offersListSlice.actions;

const getState = (state: AppState) => state.offersList;
export const getFilters = (state: AppState) => getState(state);

export default offersListSlice.reducer;
