import { MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAIL } from "../types";

export default function contactReducer(state = { messageSent: false }, action) {
  const { type, payload } = action;
  switch (type) {
    case MESSAGE_SEND_SUCCESS:
    case MESSAGE_SEND_FAIL:
      return {
        ...state,
        messageSent: payload,
      };
    default:
      return state;
  }
}
