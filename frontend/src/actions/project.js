import {
  PROJECT_GET_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_LOADING_DONE,
} from "../types";
import instance from "../axios";

export const getData = (id) => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`projects/${id}`).then((res) => {
        dispatch({
          type: PROJECT_GET_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: PROJECT_GET_FAIL,
      });
    }
  }, 1000);
};

export const doneLoading = () => async (dispatch) => {
  dispatch({
    type: PROJECT_LOADING_DONE,
  });
};
