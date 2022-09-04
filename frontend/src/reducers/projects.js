import {
  PROJECTS_GET_FAIL,
  PROJECTS_GET_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_EDIT_SUCCESS,
  PROJECT_EDIT_FAIL,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
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

export default function projectsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROJECTS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case PROJECTS_GET_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROJECT_CREATE_SUCCESS:
    case PROJECT_EDIT_SUCCESS:
    case PROJECT_DELETE_SUCCESS:
    case PROJECT_CREATE_FAIL:
    case PROJECT_EDIT_FAIL:
    case PROJECT_DELETE_FAIL:
    default:
      return state;
  }
}
