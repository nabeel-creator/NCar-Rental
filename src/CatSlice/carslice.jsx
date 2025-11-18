import { createSlice } from '@reduxjs/toolkit'

const carSlice = createSlice({
  name: 'car',
  initialState: {
    searchText: '',
    filters: {
      availability: 'all',   
      year: 'all',
      feature: 'all'
    }
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload
      state.filters[key] = value
    },
    resetFilters: (state) => {
      state.searchText = ''
      state.filters = { availability: 'all', year: 'all', feature: 'all' }
    }
  }
})


export const { setSearchText, setFilter, resetFilters } = carSlice.actions

export default carSlice.reducer
