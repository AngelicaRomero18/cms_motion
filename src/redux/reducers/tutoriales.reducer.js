import {
  GET_VIDEOS,
  GET_VIDEOS_FAILED,
  GET_VIDEOS_SUCCESS,
} from "../types/tutoriales.types";

const initialState = {
  isLoading: true,
  isHistoryLoading: false,
  errMess: null,
  tutoriales: [],
};

const TutorialesReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_VIDEOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutoriales: action.payload,
      };

    case GET_VIDEOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};

export default TutorialesReducer;