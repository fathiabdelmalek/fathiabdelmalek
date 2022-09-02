import { GET_PROJECT_SUCCESS, GET_PROJECT_FAIL, DONE_LOADING_PROJECT } from "../types";

const initialState = {
  loading: true,
  payload: {},
};

export default function projectReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case GET_PROJECT_FAIL:
      return {
        ...state,
        loading: false
      };
    case DONE_LOADING_PROJECT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
