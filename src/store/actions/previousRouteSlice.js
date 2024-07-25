// previousRouteSlice.js

import { createSlice } from "@reduxjs/toolkit";

// import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previousRoute: null,
};

const previousRouteSlice = createSlice({
    name: 'previousRoute',
    initialState,
    reducers: {
        setPreviousRoute: (state, action) => {
            state.previousRoute = action.payload;
        },
    },
});

export const { setPreviousRoute } = previousRouteSlice.actions;
export default previousRouteSlice.reducer;
