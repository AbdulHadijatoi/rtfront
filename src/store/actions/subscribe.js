import api from "../../utils/Api";

export const subscribe = (body) => async (dispatch) => {
  try {
    const res = await api.post("subscribe", body);
    dispatch({
      type: "SUBSCRIBE",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};