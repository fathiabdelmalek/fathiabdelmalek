import { GET_PROJECT_SUCCESS, GET_PROJECT_FAIL, DONE_LOADING_PROJECT } from "../types";
import instance from "../axios";

export const getData = (id) => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`projects/${id}`).then((res) => {
        dispatch({
          type: GET_PROJECT_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: GET_PROJECT_FAIL,
      });
    }
  }, 1000);
}

export const doneLoading = () => async (dispatch) => {
  dispatch({
    type: DONE_LOADING_PROJECT,
  })
}