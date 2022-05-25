import {
  GET_ACCOUNTS,
  GET_ACCOUNTS_FAILED,
  GET_ACCOUNTS_SUCCESS,
} from "../types/accounts.types";

const initialState = {
  isLoading: true,
  errMess: null,
  accounts: [],
};

const AccountsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: action.payload,
      };
    case GET_ACCOUNTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};

export default AccountsReducer;
