import axios from "axios";

import {} from "../types/accounts.types";
import {
  GET_UNITS,
  GET_UNITS_FAILED,
  GET_UNITS_SUCCESS,
} from "../types/units.types";

export const getUnitsTracking = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/tracking/units",
    headers: {},
  };
  dispatch({
    type: GET_UNITS,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_UNITS_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_UNITS_FAILED,
        payload: error,
      });
    });
};
