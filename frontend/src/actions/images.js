import { IMAGES_GET_SUCCESS, IMAGES_GET_FAIL } from "../types";
import instance from "../axios";

export const getImages = (id) => async (dispatch) => {
  let res;
  try {
    res = await instance.get(`images`);
    if (res.status === 200) {
      let images = [];
      let data = res.data;
      for (let i = 0; i < data.length; i++)
        if (data[i].project == id) images.push(data[i]);
      return dispatch({
        type: IMAGES_GET_SUCCESS,
        payload: images,
      });
    } else {
      console.log("nothing");
      dispatch({
        type: IMAGES_GET_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: IMAGES_GET_FAIL,
    });
  }
  return res;
};
