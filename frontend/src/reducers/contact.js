import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
} from "../types";

const initialState = {
  loading: true,
  payload: {
    email: "",
    body: "",
  },
};

export default function contactReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
