const initialState = {
    cart: [],
  };

  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      case "GET_CART":
        return {
          ...state,
          cart: action.payload,
        };
      case "DELETE_FROM_CART":
        const updatedCart = state.cart.cart.filter(item => item.id !== action.payload);
        console.log(updatedCart, 'updated cart');
        return {
          ...state,
          cart: updatedCart,
        };
      default:
        return state;
    }
  };

  export default cartReducer;
