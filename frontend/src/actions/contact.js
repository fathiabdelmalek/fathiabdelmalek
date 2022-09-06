import { MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAIL } from "../types";
import instance from "../axios";

export const sendMessage = (email, message) => async (dispatch) => {
  const body = JSON.stringify({
    email: email,
    body: message,
  });
  try {
    const res = await instance.post(`messages/`, body);
    if (res.data.success)
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: true,
      });
    else
      dispatch({
        type: MESSAGE_SEND_FAIL,
        payload: false,
      });
  } catch (err) {
    dispatch({
      type: MESSAGE_SEND_FAIL,
    });
  }
};
