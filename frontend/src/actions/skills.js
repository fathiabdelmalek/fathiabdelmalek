import {
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAIL,
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

export const createSkill = (name, value) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, value });
  try {
    const res = await instance.post(`skills/`, body, config);
    if (res.data.success)
      dispatch({
        type: SKILL_CREATE_SUCCESS,
        payload: {
          name,
          value,
        },
      });
    else
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
  console.log(id);
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
