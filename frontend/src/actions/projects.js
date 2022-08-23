import { GET_PROJECTS_FAIL, GET_PROJECTS_SUCCESS } from "../types";
import instance from "../axios";

export const getData = () => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`projects`).then((res) => {
        dispatch({
          type: GET_PROJECTS_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: GET_PROJECTS_FAIL,
      });
    }
  }, 1000);
};
