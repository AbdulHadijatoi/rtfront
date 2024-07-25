// store/reducers/setting.js
import { createSlice } from '@reduxjs/toolkit';
import { getHomeImage } from '../actions/setting';

const initialState = {
    homeImage: [],
    loading: false,
    error: null
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomeImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomeImage.fulfilled, (state, action) => {
                state.loading = false;
                state.homeImage = action.payload;
            })
            .addCase(getHomeImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default settingSlice.reducer;
