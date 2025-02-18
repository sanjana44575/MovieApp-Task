import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: {
    title:"",
    year:"" ,
  link:"",
 }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login } = authSlice.actions;
export const auth = (state) => state.auth.movie;

export default authSlice.reducer;
