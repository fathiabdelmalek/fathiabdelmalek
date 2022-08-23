import { GET_SKILLS_SUCCESS, GET_SKILLS_FAIL } from "../types";
import instance from "../axios";

export const getData = () => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`skills`).then((res) => {
        dispatch({
          type: GET_SKILLS_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: GET_SKILLS_FAIL,
      });
    }
  }, 1000);
};
