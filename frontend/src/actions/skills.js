import {
  SKILLS_GET_SUCCESS,
  SKILLS_GET_FAIL,
  SKILL_CREATE_SUCCESS,
  SKILL_CREATE_FAIL,
  SKILL_EDIT_SUCCESS,
  SKILL_EDIT_FAIL,
  SKILL_DELETE_SUCCESS,
  SKILL_DELETE_FAIL,
} from "../types";
import instance from "../axios";

export const getData = () => async (dispatch) => {
  setTimeout(() => {
    try {
      instance.get(`skills`).then((res) => {
        dispatch({
          type: SKILLS_GET_SUCCESS,
          payload: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: SKILLS_GET_FAIL,
      });
    }
  }, 1000);
};

export const createSkill = (name, value) => async (dispatch) => {
  const body = JSON.stringify({ name, value });
  try {
    const res = await instance.post(`skills/`, body);
    if (res.data.success) {
      console.log(res);
      dispatch({
        type: SKILL_CREATE_SUCCESS,
        payload: {
          name,
          value,
        },
      });
    } else
      dispatch({
        type: SKILL_CREATE_FAIL,
      });
    return res.data;
  } catch (err) {
    dispatch({
      type: SKILL_CREATE_FAIL,
    });
  }
};

export const editSkill = (id, name, value) => async (dispatch) => {
  const body = JSON.stringify({ name, value });
  try {
    const res = await instance.put(`skills/${id}/`, body);
    if (res.data.success)
      dispatch({
        type: SKILL_EDIT_SUCCESS,
        payload: res.data,
      });
    else
      dispatch({
        type: SKILL_EDIT_FAIL,
      });
    return res.data;
  } catch (err) {
    console.log("error in action");
    console.log(err);
    dispatch({
      type: SKILL_EDIT_FAIL,
    });
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  try {
    instance.delete(`skills/${id}`).then(() => {
      dispatch({
        type: SKILL_DELETE_SUCCESS,
        payload: id,
      });
    });
  } catch (err) {
    dispatch({
      type: SKILL_DELETE_FAIL,
    });
  }
};
