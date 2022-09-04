import {
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAIL,
} from "../types";

const initialState = {
  loading: true,
  payload: {
    full_name: "",
    job_title: "",
    phone: "",
    email: "",
    image: "",
  },
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case PROFILE_GET_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        payload,
      };
    case PROFILE_EDIT_FAIL:
    default:
      return state;
  }
}
