// /api/tutoriales/aplications

import axios from "axios";
import {
  GET_VIDEOS,
  GET_VIDEOS_FAILED,
  GET_VIDEOS_SUCCESS,
} from "../types/tutoriales.types";

export const getTutorialesMotion = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/tutoriales/aplications",
    headers: {},
  };
  dispatch({
    type: GET_VIDEOS,
    payload: "Loading...",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_VIDEOS_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_VIDEOS_FAILED,
        payload: error,
      });
    });
};
