import {
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAIL,
} from "../types";
import instance from "../axios";

export const getProfile = () => async (dispatch) => {
  let res;
  try {
    res = await instance.get(`profiles/1`);
    if (res.status === 200)
      dispatch({
        type: PROFILE_GET_SUCCESS,
        payload: res.data,
      });
    else
      dispatch({
        type: PROFILE_GET_FAIL,
      });
  } catch (e) {
    dispatch({
      type: PROFILE_GET_FAIL,
    });
  }
  return res;
};

export const editProfile = (data) => async (dispatch) => {
  const name = data.get("name");
  const job_title = data.get("job_title");
  const phone = data.get("phone");
  const image = data.get("image");
  let res;
  try {
    if (image && image !== "null") {
      res = await instance.patch(`profiles/1/`, data);
    } else {
      const body = JSON.stringify({ name, job_title, phone });
      res = await instance.patch(`profiles/1/`, body);
    }
    if (res.data.success) {
      dispatch({
        type: PROFILE_EDIT_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: PROFILE_EDIT_FAIL,
      });
    }
  } catch (err) {
    console.log("error in action");
    console.log(err);
    dispatch({
      type: PROFILE_EDIT_FAIL,
    });
  }
  return res;
};
