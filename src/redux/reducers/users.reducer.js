import {
  GET_USERS,
  GET_USERS_FAILED,
  GET_USERS_SUCCESS,
} from "../types/users.types";

const initialState = {
  isLoading: true,
  errMess: null,
  users: [],
};

const UsersReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};

export default UsersReducer;
