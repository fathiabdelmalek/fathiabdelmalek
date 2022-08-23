import { GET_PROJECTS_SUCCESS, GET_PROJECTS_FAIL } from "../types";

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
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
