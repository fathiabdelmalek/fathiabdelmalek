import {
  SKILLS_GET_SUCCESS,
  SKILLS_GET_FAIL,
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
    case SKILLS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case SKILLS_GET_FAIL:
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
      const updatedSkills = state.payload.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        payload: updatedSkills,
      };
    case SKILL_DELETE_SUCCESS:
      return {
        ...state,
        payload: state.payload.filter((item) => item.id !== action.payload),
      };
    case SKILL_CREATE_FAIL:
    case SKILL_EDIT_FAIL:
    case SKILL_DELETE_FAIL:
    default:
      return state;
  }
}
