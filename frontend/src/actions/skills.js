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

export const getSkills = () => async (dispatch) => {
  let res;
  try {
    res = await instance.get(`skills`);
    if (res.status === 200)
      dispatch({
        type: SKILLS_GET_SUCCESS,
        payload: res.data,
      });
    else
      dispatch({
        type: SKILLS_GET_FAIL,
      });
  } catch (e) {
    dispatch({
      type: SKILLS_GET_FAIL,
    });
  }
  return res;
};

export const createSkill = (name, value) => async (dispatch) => {
  const body = JSON.stringify({ name, value });
  let res;
  try {
    res = await instance.post(`skills/`, body);
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
  } catch (err) {
    dispatch({
      type: SKILL_CREATE_FAIL,
    });
  }
  return res;
};

export const editSkill = (id, name, value) => async (dispatch) => {
  const body = JSON.stringify({ name, value });
  let res;
  try {
    res = await instance.put(`skills/${id}/`, body);
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
    dispatch({
      type: SKILL_EDIT_FAIL,
    });
  }
  return res;
};

export const deleteSkill = (id) => async (dispatch) => {
  let res;
  try {
    res = instance.delete(`skills/${id}`);
    if (res.status === 204)
      dispatch({
        type: SKILL_DELETE_SUCCESS,
        payload: id,
      });
    else
      dispatch({
        type: SKILL_DELETE_FAIL,
      });
  } catch (err) {
    dispatch({
      type: SKILL_DELETE_FAIL,
    });
  }
  return res;
};
