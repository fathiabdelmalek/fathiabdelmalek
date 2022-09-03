import {
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAIL,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_EDIT_SUCCESS,
  PROJECT_EDIT_FAIL,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  SKILL_CREATE_SUCCESS,
  SKILL_CREATE_FAIL,
  SKILL_EDIT_SUCCESS,
  SKILL_EDIT_FAIL,
  SKILL_DELETE_SUCCESS,
  SKILL_DELETE_FAIL,
} from "../types";
import instance from "../axios";

export const editProfile =
  (full_name, job_title, phone, email, image = null) =>
  async (dispatch) => {};

export const createProject =
  (name, description, image = null) =>
  async (dispatch) => {};

export const editProject =
  (id, name, description, image = null) =>
  async (dispatch) => {};

export const deleteProject = (id) => async (dispatch) => {};
