import api from "../../utils/Api";

export const userRegister = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("user/register", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const userLogin = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("user/login", formValues);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProfile = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("user/update/profile", formValues);
    dispatch({
      type: "PROFILE_UPDATE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("user/update/password", formValues);
    dispatch({
      type: "UPDATE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const sendEmail = (email) => async (dispatch) => {
  try {

    const res = await api.post("/forgot-password", email);

    return res;
  } catch (err) {
    throw err;
  }
};


export const otpConfirmation = (otp) => async (dispatch) => {
  try {

    const res = await api.post("/verify-otp", otp);

    return res;
  } catch (err) {
    throw err;
  }
};
export const resetPassword = (formValues) => async (dispatch) => {
  try {

    const res = await api.post("/reset-password", formValues);

    return res;
  } catch (err) {
    throw err;
  }
};


export const logout = () => async (dispatch) => {
  try {

    dispatch({
      type: "SUCCESS_LOGOUT"
    });
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};


export const getMenus = () => async (dispatch) => {
  try {
      const res = await api.get(`all/menus`);
      dispatch({
          type: "GET_MENU",
          payload: res.data,
      });
      return res;
  } catch (err) {
      throw err;
  }
};
