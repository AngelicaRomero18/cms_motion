import {
  SAVE_LIST_COOLORS,
  SAVE_LIST_COOLORS_FAILED,
} from "../types/colors.types";

const initialState = {
  isLoading: true,
  isHistoryLoading: false,
  errMess: null,
  coolors: [],
};

const CoolorsReducer = function (state = initialState, action) {
  switch (action.type) {
    case SAVE_LIST_COOLORS:
      return {
        isLoading: false,
        coolors: [action.payload],
      };

    case SAVE_LIST_COOLORS_FAILED:
      return { isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};

export default CoolorsReducer;
