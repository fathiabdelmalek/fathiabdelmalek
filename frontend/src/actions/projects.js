import {
  PROJECTS_GET_FAIL,
  PROJECTS_GET_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
} from "../types";
import instance from "../axios";

export const getProjects = () => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`projects`).then((res) => {
        dispatch({
          type: PROJECTS_GET_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: PROJECTS_GET_FAIL,
      });
    }
  }, 1000);
};

export const createProject =
  (name, description, image = null) =>
  async (dispatch) => {
    try {
    } catch (err) {
      dispatch({
        type: PROJECT_CREATE_FAIL,
      });
    }
  };
