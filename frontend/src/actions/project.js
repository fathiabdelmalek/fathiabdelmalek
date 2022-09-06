import {
  PROJECT_GET_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_LOADING_DONE,
  PROJECT_EDIT_SUCCESS,
  PROJECT_EDIT_FAIL,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
} from "../types";
import instance from "../axios";

export const getProject = (id) => async (dispatch) => {
  let res;
  try {
    res = await instance.get(`projects/${id}`);
    if (res.status === 200)
      dispatch({
        type: PROJECT_GET_SUCCESS,
        payload: res.data,
      });
    else
      dispatch({
        type: PROJECT_GET_FAIL,
      });
    return res;
  } catch (err) {
    dispatch({
      type: PROJECT_GET_FAIL,
    });
  }
  return res;
};

export const doneLoading = () => async (dispatch) => {
  dispatch({
    type: PROJECT_LOADING_DONE,
  });
};

export const editProject = (id, data) => async (dispatch) => {
  const name = data.get("name");
  const description = data.get("description");
  const image = data.get("image");
  let res;
  try {
    if (image && image !== "null") {
      res = await instance.patch(`projects/${id}/`, data);
    } else {
      const body = JSON.stringify({ name, description });
      res = await instance.patch(`projects/${id}/`, body);
    }
    if (res.data.success) {
      dispatch({
        type: PROJECT_EDIT_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: PROJECT_EDIT_FAIL,
      });
    }
  } catch (err) {
    console.log("error in action");
    console.log(err);
    dispatch({
      type: PROJECT_EDIT_FAIL,
    });
  }
  return res;
};

export const deleteProject = (id) => async (dispatch) => {
  let res;
  try {
    res = await instance.delete(`projects/${id}`);
    if (res.status === 204)
      dispatch({
        type: PROJECT_DELETE_SUCCESS,
        payload: id,
      });
    else
      dispatch({
        type: PROJECT_DELETE_FAIL,
      });
  } catch (err) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
    });
  }
  return res;
};
