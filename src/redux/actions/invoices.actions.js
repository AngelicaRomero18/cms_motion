import axios from "axios";

import {
  GET_INVOICES,
  GET_INVOICES_FAILED,
  GET_INVOICES_SUCCESS,
} from "../types/invoices.types";

export const getInvoicesTracking = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/invoices",
    headers: {},
  };
  dispatch({
    type: GET_INVOICES,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_INVOICES_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_INVOICES_FAILED,
        payload: error,
      });
    });
};
