import {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../types";
import instance from "../axios";

export const checkAuthenticated = () => async (dispatch) => {
  try {
    instance.get(`settings/is-authenticated/`).then((res) => {
      if (res.data.isAuthenticated === "Yes") {
        return dispatch({
          type: AUTHENTICATED_SUCCESS,
          payload: {
            isAuthenticated: true,
          },
        });
      } else {
        return dispatch({
          type: AUTHENTICATED_FAIL,
          payload: {
            isAuthenticated: false,
          },
        });
      }
    });
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: {
        isAuthenticated: false,
      },
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  let res;
  const body = JSON.stringify({ email, password });
  try {
    res = await instance.post(`settings/login/`, body);
    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } else if (res.data.email_error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          email_error: res.data.email_error,
          password_error: "",
        },
      });
    } else if (res.data.password_error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          email_error: "",
          password_error: res.data.password_error,
        },
      });
    }
    return res;
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
  return res;
};

export const logout = () => async (dispatch) => {
  const body = JSON.stringify({
    withCredentials: true,
  });
  try {
    instance.post(`settings/logout/`, body).then((res) => {
      if (res.data.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      } else {
        dispatch({
          type: LOGOUT_FAIL,
        });
      }
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
