import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";
import {
  GET_MYACCOUNT,
  GET_MYACCOUNT_FAILED,
  GET_MYACCOUNT_SUCCESS,
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_MYACCOUNT,
  UPDATE_MYACCOUNT_FAILED,
  UPDATE_MYACCOUNT_SUCCESS,
} from "../types/user.types";

const initialState = {
  isLoading: true,
  errMess: null,
  user: [],
  isLoadingAccount: false,
  MyAccount: [],
};

const UserReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case GET_MYACCOUNT:
      return {
        ...state,
        isLoadingAccount: true,
      };

    case GET_MYACCOUNT_SUCCESS:
      return {
        ...state,
        isLoadingAccount: false,
        MyAccount: action.payload,
      };

    case GET_MYACCOUNT_FAILED:
      return {
        ...state,
        isLoadingAccount: false,
        errMessAccount: false,
      };

    case UPDATE_MYACCOUNT:
      return {
        ...state,
        isLoadingUpdate: true,
      };

    case UPDATE_MYACCOUNT_SUCCESS:
      return {
        ...state,
        isLoadingUpdate: false,
        updateMyAccount: true,
      };

    case UPDATE_MYACCOUNT_FAILED:
      return {
        ...state,
        isLoadingUpdate: false,
        updateMyAccount: true,
        errMessUpdate: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
