import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from "../types";
import instance from "../axios";

export const getData = () => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`profiles/1`).then((res) => {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: GET_PROFILE_FAIL,
      });
    }
  }, 1000);
};
