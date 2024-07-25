// categoriesActions.js

export const updateTotalAmount = (totalAmount) => ({
    type: 'UPDATE_TOTAL_AMOUNT',
    payload: totalAmount,
});

// categoriesReducer.js

const initialState = {
    totalAmount: 0,
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TOTAL_AMOUNT':
            return {
                ...state,
                totalAmount: action.payload,
            };
        default:
            return state;
    }
};

export default categoriesReducer;
