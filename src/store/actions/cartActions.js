import api from "../../utils/Api";

export const addToCart = (p_id, q, total, date, adult, child, infant) => async (dispatch) => {
  const body = {
    package_id: p_id,
    quantity: q,
    price: total,
    tour_date: date,
    adult: adult,
    child: child,
    infant: infant
  };

  try {
    const res = await api.post("user/cart", body);
    // dispatch({
    //   type: "ADD_TO_CART",
    //   payload: res.data,
    // });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getCart = () => async (dispatch) => {
  try {
    const res = await api.get("user/cart");
    dispatch({
      type: "GET_CART",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    await api.delete(`user/cart/${id}`);
    // dispatch({
    //   type: "DELETE_FROM_CART",
    //   payload: id,
    // });
  } catch (err) {
    throw err;
  }
};
