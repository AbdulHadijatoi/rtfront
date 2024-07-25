import api from "../../utils/Api";

export const addToWishList = (activityId) => async (dispatch) => {
  try {
    const res = await api.post("user/wishlist", { activity_id: activityId });

    return res;
  } catch (err) {
    throw err;
  }
};


// export const getWishList = () => async (dispatch) => {
//   try {
//     const res = await api.get("user/wishlist");

//     return res;
//   } catch (err) {
//     throw err;
//   }
// };

export const getWishList = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_WISHLIST_REQUEST' });
    const res = await api.get("user/wishlist");
    dispatch({ type: 'GET_WISHLIST_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'GET_WISHLIST_FAILURE', payload: err.message });
    throw err;
  }
};

// export const deleteWishList = (activityId) => async (dispatch) => {
//   try {
//     const res = await api.delete(`user/wishlist/${activityId}`);

//     return res;
//   } catch (err) {
//     throw err;
//   }
// };

export const deleteWishList = (activityId) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_WISHLIST_REQUEST' });
    const res = await api.delete(`user/wishlist/${activityId}`);
    dispatch({ type: 'DELETE_WISHLIST_SUCCESS', payload: { deletedItemId: activityId } });
    
    return res;
  } catch (err) {
    dispatch({ type: 'DELETE_WISHLIST_FAILURE', payload: err.message });
    throw err;
  }
};


// import api from "../../utils/Api";

// // Action types
// const ADD_TO_WISHLIST_REQUEST = 'ADD_TO_WISHLIST_REQUEST';
// const ADD_TO_WISHLIST_SUCCESS = 'ADD_TO_WISHLIST_SUCCESS';
// const ADD_TO_WISHLIST_FAILURE = 'ADD_TO_WISHLIST_FAILURE';

// const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST';
// const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS';
// const GET_WISHLIST_FAILURE = 'GET_WISHLIST_FAILURE';

// const DELETE_WISHLIST_REQUEST = 'DELETE_WISHLIST_REQUEST';
// const DELETE_WISHLIST_SUCCESS = 'DELETE_WISHLIST_SUCCESS';
// const DELETE_WISHLIST_FAILURE = 'DELETE_WISHLIST_FAILURE';

// export const addToWishList = (activityId) => async (dispatch) => {
//   dispatch({ type: ADD_TO_WISHLIST_REQUEST });
//   try {
//     const res = await api.post("user/wishlist", { activity_id: activityId });
//     dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: res.data });
//     return res;
//   } catch (err) {
//     dispatch({ type: ADD_TO_WISHLIST_FAILURE, payload: err.message });
//     throw err;
//   }
// };

// export const getWishList = () => async (dispatch) => {
//   dispatch({ type: GET_WISHLIST_REQUEST });
//   try {
//     const res = await api.get("user/wishlist");
//     dispatch({ type: GET_WISHLIST_SUCCESS, payload: res.data });
//     return res;
//   } catch (err) {
//     dispatch({ type: GET_WISHLIST_FAILURE, payload: err.message });
//     throw err;
//   }
// };

// export const deleteWishList = (activityId) => async (dispatch) => {
//   dispatch({ type: DELETE_WISHLIST_REQUEST });
//   try {
//     const res = await api.delete(`user/wishlist/${activityId}`);
//     dispatch({ type: DELETE_WISHLIST_SUCCESS, payload: activityId });
//     return res;
//   } catch (err) {
//     dispatch({ type: DELETE_WISHLIST_FAILURE, payload: err.message });
//     throw err;
//   }
// };

