// import { SET_TOTAL_AMOUNT } from './actions';

import { SET_TOTAL_AMOUNT } from "../actions/amount";

// Initial state
const initialState = {
    totalAmount: 0,
    // Other state properties
};

// Reducer to handle total amount update
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL_AMOUNT:
            return {
                ...state,
                totalAmount: action.payload,
            };
        // Other cases
        default:
            return state;
    }
};

export default reducer;
