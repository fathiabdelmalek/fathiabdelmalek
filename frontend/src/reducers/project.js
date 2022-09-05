import {
  PROJECT_GET_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_LOADING_DONE,
} from "../types";

const initialState = {
  loading: true,
  payload: {
    id: 0,
    name: "",
    likes: "",
    image: "",
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
    default:
      return state;
  }
}
