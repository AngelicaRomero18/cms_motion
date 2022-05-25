import {
  CLOSE_CREATED_TICKET,
  CREATE_TICKET,
  CREATE_TICKET_FAILED,
  CREATE_TICKET_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_SUCCESS,
  GET_TICKETS,
  GET_TICKETS_FAILED,
  GET_TICKETS_SUCCESS,
} from "../types/tickets.types";

const initialState = {
  isLoading: true,
  errMess: null,
  tickets: [],
};

const TicketsReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tickets: action.payload,
      };
    case GET_TICKETS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    case CREATE_TICKET:
      return {
        ...state,
        tryCreated: true,
        failCreated: false,
        created: true,
        isLoadingCreate: true,
      };

    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        created: true,
        failCreated: false,
        tryCreated: false,
        isLoadingCreate: false,
      };

    case CREATE_TICKET_FAILED:
      return {
        ...state,
        errMess: action.payload,
        created: false,
        failCreated: true,
        tryCreated: false,
        isLoadingCreate: false,
      };

    case CLOSE_CREATED_TICKET:
      return {
        ...state,
        errMess: action.payload,
        created: false,
        failCreated: false,
        tryCreated: false,
      };

    case GET_MESSAGE:
      return {
        ...state,
        loadingMessage: true,
      };

    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loadingMessage: false,
        messages: action.payload,
      };

    case GET_MESSAGE_FAILED:
      return {
        ...state,
        loadingMessage: false,
        errMessages: true,
      };

    default:
      return state;
  }
};

export default TicketsReducer;
