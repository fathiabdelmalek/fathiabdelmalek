import {
  PROJECTS_GET_FAIL,
  PROJECTS_GET_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
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
      return {
        ...state,
        payload: [...state.payload, payload],
      };
    case PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        payload: state.payload.filter((item) => item.id !== action.payload),
      };
    case PROJECT_CREATE_FAIL:
    case PROJECT_DELETE_FAIL:
    default:
      return state;
  }
}
