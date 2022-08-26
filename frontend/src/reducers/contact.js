import { SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL } from "../types";

export default function contactReducer(state = { messageSent: false }, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE_SUCCESS:
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        messageSent: payload,
      };
    default:
      return state;
  }
}
