import {
  CLOSE_CREATED,
  GET_MESSAGES,
  GET_MESSAGES_FAILED,
  GET_MESSAGES_SUCCESS,
  GET_NUMBERS,
  GET_NUMBERS_FAILED,
  GET_NUMBERS_SUCCESS,
  SEND_SMS,
  SEND_SMS_FAILED,
  SEND_SMS_SUCCESS,
} from "../types/sms.types";

const initialState = {
  isLoading: true,
  errMess: null,
  tryCreated: false,
  created: false,
  numbers: [],
  messages: [],
};

const SmsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_NUMBERS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_NUMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        numbers: action.payload,
      };

    case GET_NUMBERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case GET_MESSAGES:
      return {
        ...state,
        isLoading: true,
      };

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload,
      };

    case GET_MESSAGES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case SEND_SMS:
      return {
        ...state,
        tryCreated: true,
        failCreated: false,
        created: true,
        isLoadingCreate: true,
      };

    case SEND_SMS_SUCCESS:
      return {
        ...state,
        created: true,
        failCreated: false,
        tryCreated: false,
        isLoadingCreate: false,
      };

    case SEND_SMS_FAILED:
      return {
        ...state,
        errMess: action.payload,
        created: false,
        failCreated: true,
        tryCreated: false,
        isLoadingCreate: false,
      };

    case CLOSE_CREATED:
      return {
        ...state,
        errMess: action.payload,
        created: false,
        failCreated: false,
        tryCreated: false,
      };

    default:
      return state;
  }
};

export default SmsReducer;
