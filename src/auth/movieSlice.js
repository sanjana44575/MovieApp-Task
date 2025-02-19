import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: {
        title: "",
        year: "",
        
        link: ""
    }
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        updateMovies: (state, action) => {
            state.movies = { ...state.movies, ...action.payload };
        }
    }
});

export const { updateMovies } = movieSlice.actions;
export const selectMovies = (state) => state.movie.movies;

export default movieSlice.reducer;

