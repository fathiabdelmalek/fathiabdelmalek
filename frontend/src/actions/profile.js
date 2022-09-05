import {
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAIL,
} from "../types";
import instance from "../axios";

export const getData = () => async (dispatch) => {
  // setTimeout(() => {
  try {
    instance.get(`profiles/1`).then((res) => {
      dispatch({
        type: PROFILE_GET_SUCCESS,
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: PROFILE_GET_FAIL,
    });
  }
  // }, 1000);
};

export const editProfile =
  // (name, job_title, phone, image) => async (dispatch) => {
  (data) => async (dispatch) => {
    // if (image) {
    try {
      const res = await instance.put(`profiles/1/`, data);
      // if (res.data.success) {
      if (res.status === 200) {
        dispatch({
          type: PROFILE_EDIT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PROFILE_EDIT_FAIL,
        });
      }
      // return res.data;
      return res;
    } catch (err) {
      console.log("error in action");
      console.log(err);
      dispatch({
        type: PROFILE_EDIT_FAIL,
      });
    }
    // } else {
    //   const body = JSON.stringify({ name, job_title, phone, image });
    //   try {
    //     const res = await instance.patch(`profiles/1/`, body);
    //     if (res.status === 200) {
    //       dispatch({
    //         type: PROFILE_EDIT_SUCCESS,
    //         payload: res.data,
    //       });
    //     } else {
    //       dispatch({
    //         type: PROFILE_EDIT_FAIL,
    //       });
    //     }
    //     return res.data;
    //   } catch (err) {
    //     dispatch({
    //       type: PROFILE_EDIT_FAIL,
    //     });
    //   }
    // }
  };
