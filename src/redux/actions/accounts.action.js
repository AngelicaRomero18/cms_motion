import axios from "axios";

import {
  GET_ACCOUNTS,
  GET_ACCOUNTS_FAILED,
  GET_ACCOUNTS_SUCCESS,
} from "../types/accounts.types";

export const getAccountsTracking = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/accounts",
    headers: {},
  };
  dispatch({
    type: GET_ACCOUNTS,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_ACCOUNTS_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_ACCOUNTS_FAILED,
        payload: error,
      });
    });
};
