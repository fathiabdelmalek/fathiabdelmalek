import {
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAIL,
  SKILL_CREATE_SUCCESS,
  SKILL_CREATE_FAIL,
  SKILL_EDIT_SUCCESS,
  SKILL_EDIT_FAIL,
  SKILL_DELETE_SUCCESS,
  SKILL_DELETE_FAIL,
} from "../types";

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
    case SKILL_CREATE_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, payload],
      };
    case SKILL_EDIT_SUCCESS:
    case SKILL_DELETE_SUCCESS:
      return {
        ...state,
        payload: state.payload.filter(
          (item, index) => item.id !== action.payload
        ),
      };
    case SKILL_CREATE_FAIL:
    case SKILL_EDIT_FAIL:
    case SKILL_DELETE_FAIL:
    default:
      return state;
  }
}
