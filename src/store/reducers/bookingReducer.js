// In store/reducers/bookingReducer.js

import { CLEAR_BOOKING_DETAILS, SET_BOOKING_DETAILS } from "../actions/bookingAction";

// import { SET_BOOKING_DETAILS, CLEAR_BOOKING_DETAILS } from './actions/bookingActions';

const initialState = {
    bookingDetails: null,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: action.payload,
            };
        case CLEAR_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: null,
            };
        default:
            return state;
    }
};

export default bookingReducer;
