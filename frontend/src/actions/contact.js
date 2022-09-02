import { SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL } from "../types";
import instance from "../axios";
import Cookie from "js-cookie";

export const sendMessage = (email, message) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookie.get("csrftoken"),
    },
  };
  const body = JSON.stringify({
    email: email,
    body: message,
  });
  try {
    const res = await instance.post(`messages/`, body, config);
    if (res.data.success)
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: true,
      });
    else
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: false,
      });
  } catch (err) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
    });
  }
};
