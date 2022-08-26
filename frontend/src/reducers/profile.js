import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from "../types";

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
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        payload,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
