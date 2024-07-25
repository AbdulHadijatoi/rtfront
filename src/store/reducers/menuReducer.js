// Initial state for menus
const initialState = {
    menus: [],
    loading: false,
    error: null
  };

  // Reducer function
  const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_MENU":
        return {
          ...state,
          menus: action.payload,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };

  export default menuReducer;
