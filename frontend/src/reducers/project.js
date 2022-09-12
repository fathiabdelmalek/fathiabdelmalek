import {
  PROJECT_GET_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_LOADING_DONE,
  PROJECT_EDIT_SUCCESS,
  PROJECT_EDIT_FAIL,
} from "../types";

const initialState = {
  loading: true,
  payload: {
    id: 0,
    name: "",
    link: "",
    description: "",
  },
};

export default function projectReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROJECT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case PROJECT_GET_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROJECT_LOADING_DONE:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_EDIT_SUCCESS:
      return {
        ...state,
        payload,
      };
    case PROJECT_EDIT_FAIL:
    default:
      return state;
  }
}
