import axios from "axios";

import {
  GET_USERS,
  GET_USERS_FAILED,
  GET_USERS_SUCCESS,
} from "../types/users.types";

export const getUsersTracking = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/tracking/users",
    headers: {},
  };
  dispatch({
    type: GET_USERS,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_USERS_FAILED,
        payload: error,
      });
    });
};
