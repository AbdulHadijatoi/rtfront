import api from "../../utils/Api";

export const getAllBlogs = () => async (dispatch) => {
    try {
        const res = await api.get("show/blogs");
        dispatch({
            type: "GET_BLOGS",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getBlogBID = (id) => async (dispatch) => {
    try {
        const res = await api.get(`show/blog/${id}`);
        dispatch({
            type: "GET_BLOG_BY_ID",
            payload: res.data,
        });
        return res;
    } catch (err) {
        throw err;
    }
};