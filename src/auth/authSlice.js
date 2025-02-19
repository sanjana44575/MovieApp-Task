import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    movie: {
        title: "",
        year: "",
        link: ""
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    }
});

export const { login } = authSlice.actions;
export const auth = (state) => state.auth;

export default authSlice.reducer;
