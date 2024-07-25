import api from "../../utils/Api";
import Cookies from "js-cookie";



export const getCategories = () => async (dispatch) => {
  try {
    const res = await api.get("all_category");
    dispatch({
      type: "GET_CATEGORIES",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getActivitiesById = (slug) => async (dispatch) => {
  try {
    const res = await api.get(`activity/${slug}`);
    dispatch({
      type: "GET_ACTIVITIES_BY_ID",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};


export const getPopularActivities = () => async (dispatch) => {
  dispatch({ type: "GET_POPULAR_ACTIVITIES_REQUEST" });
  try {
    const res = await api.get(`all_activity`);
    dispatch({
      type: "GET_POPULAR_ACTIVITIES",
      payload: res.data,
    });
    // console.log(res, 'popular activity data');
    return res;
  } catch (err) {
    dispatch({
      type: "GET_POPULAR_ACTIVITIES_FAILURE",
      error: err,
    });
    throw err;
  }
};

export const getActivities = () => async (dispatch) => {
  try {
    const res = await api.get("all_activity");

    return res;
  } catch (err) {
    throw err;
  }
};


export const Send_Gift = (body) => async (dispatch) => {
  try {
    const endpoint = "send/giftCard";
    const res = await api.post(endpoint, body);
    dispatch({
      type: "SEND_GIFT",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const UpdateBookingStatus = (reference_id, email) => async (dispatch) => {
  try {
    const endpoint = "status/booking/"+ reference_id;

    const res = await api.post(endpoint,{status: "success",'email': email});
    dispatch({
      type: "BOOKING",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const Booking = (body, token, package_details) => async (dispatch) => {
  console.log(body, 'zzzzzzzz')
  try {
    const { first_name, last_name, email, activity_name, title, nationality, phone, date, adult, child, infant, total_amount, pickup_location, note, status, package_id } = body;

    Cookies.set('bookingDetails', JSON.stringify({
      first_name,
      last_name,
      email,
      activity_name,
      title,
      nationality,
      phone,
      date,
      adult,
      child,
      infant,
      total_amount,
      pickup_location,
      note,
      status,
      package_id
    }), { expires: 1 });

    const endpoint = token ? "user/booking" : "booking";

    const res = await api.post(endpoint, body);
    dispatch({
      type: "BOOKING",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};



export const StripePay = (body) => async (dispatch) => {
  try {
    const res = await api.post("/stripe", body);
    return res.data;
  } catch (err) {
    console.error("Error creating PaymentIntent:", err);
    throw err;
  }
};


export const Post_Reviews = (body) => async (dispatch) => {
  try {
    const res = await api.post("user/add/review", body);
    dispatch({
      type: "REVIEWS",
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error("Error creating PaymentIntent:", err);
    throw err;
  }
};
