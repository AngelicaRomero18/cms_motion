import {
  //Buffer
  SAVE_LIST_IMAGES,
  SAVE_LIST_IMAGES_FAILED,
} from "../types/images.types";

const initialState = {
  isLoading: true,
  isHistoryLoading: false,
  errMess: null,
  images: [],
};

const ImagesReducer = function (state = initialState, action) {
  switch (action.type) {
    case SAVE_LIST_IMAGES:
      return {
        isLoading: false,
        images: action.payload,
      };

    case SAVE_LIST_IMAGES_FAILED:
      return { isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};

export default ImagesReducer;
