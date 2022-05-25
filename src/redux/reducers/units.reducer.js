import {
  GET_UNITS,
  GET_UNITS_FAILED,
  GET_UNITS_SUCCESS,
} from "../types/units.types";

const initialState = {
  isLoading: true,
  errMess: null,
  units: [],
};

const UnitsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_UNITS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_UNITS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        units: action.payload,
      };
    case GET_UNITS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};

export default UnitsReducer;
