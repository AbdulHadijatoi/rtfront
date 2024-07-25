import api from "../../utils/Api";

export const SendHelp = (body) => async (dispatch) => {
    try {
        const res = await api.post("helps", body);
        dispatch({
            type: "SEND_HELP",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};
