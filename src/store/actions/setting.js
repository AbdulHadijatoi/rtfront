import api from "../../utils/Api";

export const getHomeImage = () => async (dispatch) => {
    try {
        const res = await api.get('home/image');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'home' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getAboutImage = () => async (dispatch) => {
    try {
        const res = await api.get('about/image');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'about' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getContactUs = () => async (dispatch) => {
    try {
        const res = await api.get('contact/us');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'contact' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getFindUs = () => async (dispatch) => {
    try {
        const res = await api.get('find/us');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'find' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getGuideline = () => async (dispatch) => {
    try {
        const res = await api.get('guidelines/image');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'find' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};


export const getPrivacyPolicy = () => async (dispatch) => {
    try {
        const res = await api.get('privacyPolicy/image');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'find' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};


export const getTermsCondition = () => async (dispatch) => {
    try {
        const res = await api.get('termsConditions/image');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'find' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};



export const getBlogImage = () => async (dispatch) => {
    try {
        const res = await api.get('blog/page/image');
        dispatch({
            type: "GET_IMAGE",
            payload: res.data,
            meta: { imageType: 'find' },
        });
        return res;
    } catch (err) {
        throw err;
    }
};
