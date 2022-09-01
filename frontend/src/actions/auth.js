import {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../types";
import instance from "../axios";
import Cookie from "js-cookie";

export const checkAuthenticated = () => async (dispatch) => {
  try {
    instance.get(`admin/is-authenticated/`).then((res) => {
      if (res.data.error || res.data.isAuthenticated === "error") {
        dispatch({
          type: AUTHENTICATED_FAIL,
          payload: {
            isAuthenticated: false,
          },
        });
      } else if (res.data.isAuthenticated === "Yes") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
          payload: {
            isAuthenticated: true,
          },
        });
      } else {
        dispatch({
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
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookie.get("csrftoken"),
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    instance.post(`admin/login/`, body, config).then((res) => {
      if (res.data.success) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
      } else if (res.data.email_error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            email_error: res.data.email_error,
          },
        });
      } else if (res.data.password_error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            password_error: res.data.password_error,
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookie.get("csrftoken"),
    },
  };
  const body = JSON.stringify({
    withCredentials: true,
  });
  try {
    instance.post(`admin/logout/`, body, config).then((res) => {
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
