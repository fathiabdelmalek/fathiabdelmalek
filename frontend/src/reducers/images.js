import {
  IMAGES_GET_SUCCESS,
  IMAGES_GET_FAIL,
  IMAGE_CREATE_SUCCESS,
  IMAGE_CREATE_FAIL,
} from "../types";

const initialState = {
  payload: [],
};

export default function imagesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case IMAGES_GET_SUCCESS:
      return {
        ...state,
        payload,
      };
    case IMAGE_CREATE_SUCCESS:
    case IMAGE_CREATE_FAIL:
    case IMAGES_GET_FAIL:
    default:
      return state;
  }
}
