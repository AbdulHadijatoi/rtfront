import api from "../../utils/Api";

export const send_message = (body) => async (dispatch) => {
  try {
    const res = await api.post("contact_us", body);
    dispatch({
      type: "SEND_MESSAGE",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
