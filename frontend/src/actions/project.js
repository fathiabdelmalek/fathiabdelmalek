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
  // setTimeout(() => {
  try {
    const res = await instance.get(`projects/${id}`);
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
  } catch (e) {
    dispatch({
      type: PROJECT_GET_FAIL,
    });
  }
  // }, 1000);
};

export const doneLoading = () => async (dispatch) => {
  dispatch({
    type: PROJECT_LOADING_DONE,
  });
};

export const editProject =
  (id, name, description, image = null) =>
  async (dispatch) => {};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const res = await instance.delete(`projects/${id}`);
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
};
