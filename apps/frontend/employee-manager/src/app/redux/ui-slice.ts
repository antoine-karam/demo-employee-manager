import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { keyword: string } = {
  keyword: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    filterUsersByKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
