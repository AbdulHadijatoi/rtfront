// In store/actions/bookingActions.js
import api from "../../utils/Api";

export const getAllBooking = () => async (dispatch) => {
    try {
        const res = await api.get("user/bookings");
        dispatch({
            type: "GET_BOOKING",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};


export const OrderCancel = (id) => async (dispatch) => {
    try {
        const res = await api.put(`user/cancel/booking/${id}`);
        dispatch({
            type: "ORDER_CANCEL",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const BookingUpdate = (id, date) => async (dispatch) => {
    try {
        const res = await api.put(`user/booking/${id}?date=${date}`);
        dispatch({
            type: "BOOKING_UPDATE",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const Apply_Voucher = (voucherCode) => async (dispatch) => {
    try {
        const res = await api.post("user/apply/voucher", { voucher_code: voucherCode });
        // Ensure the discount amount is negative
        res.data.discountAmount = -Math.abs(res.data.discountAmount);
        dispatch({
            type: "APPLY_VOUCHER",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};



export const SET_BOOKING_DETAILS = 'SET_BOOKING_DETAILS';
export const CLEAR_BOOKING_DETAILS = 'CLEAR_BOOKING_DETAILS';

export const setBookingDetails = (bookingDetails) => ({
    type: SET_BOOKING_DETAILS,
    payload: bookingDetails,
});

export const clearBookingDetails = () => ({
    type: CLEAR_BOOKING_DETAILS,
});
