import {
  GET_SIDENAV,
  GET_SIDENAV_SUCCESS,
  GET_SIDENAV_FAILED,
  SELECT_ELEMENT_SIDENAV,
} from "../types/sidenav.types";

const initialState = {
  isLoading: true,
  isHistoryLoading: false,
  errMess: null,
  sidenav: [],
  elementSelected: 5,
};

const SidenavReduer = function (state = initialState, action) {
  switch (action.type) {
    case GET_SIDENAV:
      return {
        ...state,
        isLoading: true,
      };

    case GET_SIDENAV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sidenav: action.payload,
      };

    case GET_SIDENAV_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case SELECT_ELEMENT_SIDENAV:
      return {
        ...state,
        elementSelected: action.payload,
      };

    default:
      return state;
  }
};

export default SidenavReduer;
