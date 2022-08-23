import { GET_SKILLS_SUCCESS, GET_SKILLS_FAIL } from "../types";

const initialState = {
  loading: true,
  payload: {
    id: 0,
    name: "",
    value: "",
  },
};

export default function skillsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case GET_SKILLS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
