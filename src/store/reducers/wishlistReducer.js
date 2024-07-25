// Define initial state
const initialState = {
    loading: false,
    wishlist: [],
    error: null
  };

  // Reducer function
  const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_WISHLIST_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'GET_WISHLIST_SUCCESS':
        return {
          ...state,
          loading: false,
          wishlist: action.payload,
          error: null
        };
      case 'GET_WISHLIST_FAILURE':
        return {
          ...state,
          loading: false,
          wishlist: [],
          error: action.payload
        };
      default:
        return state;
    }
  };

  export default wishlistReducer;
