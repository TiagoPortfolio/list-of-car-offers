import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../../store'

export type OffersFiltersState = {
  searchTerm: string
  orderBy: 'NAME' | 'PRICE_ASC' | 'PRICE_DESC'
}

const initialState: OffersFiltersState = {
  searchTerm: '',
  orderBy: 'NAME',
}

export const offersListSlice = createSlice({
  name: 'offersList',
  initialState,
  reducers: {
    changedSearchTermFilter: (
      state,
      { payload: searchTerm }: PayloadAction<OffersFiltersState['searchTerm']>,
    ) => {
      state.searchTerm = searchTerm
    },
    changedOrderByFilter: (
      state,
      { payload: orderBy }: PayloadAction<OffersFiltersState['orderBy']>,
    ) => {
      state.orderBy = orderBy
    },
  },
})

export const { changedSearchTermFilter, changedOrderByFilter } =
  offersListSlice.actions

const getState = (state: AppState) => state.offersList
export const getFilters = (state: AppState) => getState(state)

export default offersListSlice.reducer
