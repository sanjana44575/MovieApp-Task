import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
    const response = await fetch("http://localhost:3000/movies")
    return response.json();
})

export const authSaga=createSlice({
    name: "api",
    initialState: {
        isLoading: false,
        
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchMovies.fulfilled , (state, action) => {
            state.todolist=action.payload

                state.isLoading = false
        });
        builder.addCase(fetchMovies.rejected, (state) => {
            state.isError = true
        })

    }
})
export default authSaga.reducer;
