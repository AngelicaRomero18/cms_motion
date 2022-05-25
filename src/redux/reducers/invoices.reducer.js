import {
  GET_INVOICES,
  GET_INVOICES_FAILED,
  GET_INVOICES_SUCCESS,
} from "../types/invoices.types";

const initialState = {
  isLoading: true,
  errMess: null,
  invoices: [],
};

const InvoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invoices: action.payload,
      };
    case GET_INVOICES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};

export default InvoicesReducer;
