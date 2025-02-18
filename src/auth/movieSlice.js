import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: {
        title:"",
         year:"",
         poster:"",
        link:""
  }
};

export const movieSlice = createSlice({
  name: "movieauth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.movies = { ...state.movies, ...action.payload };
    },
  },
});

export const { login } = authSlice.actions;
export const movieauth = (state) => state.movieauth.movies;

export default authSlice.reducer;
