import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
} from "../types";

const initialState = {
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
}
