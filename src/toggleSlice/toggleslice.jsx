import { createSlice } from '@reduxjs/toolkit'
const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen
    }
  }
})

export const { toggleIsOpen } = toggleSlice.actions

export default toggleSlice.reducer
