import axios from "axios";

import {
  GET_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_SUCCESS,
} from "../types/category.types";

export const getCategories = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/category",
    headers: {},
  };
  dispatch({
    type: GET_CATEGORY,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_CATEGORY_FAILED,
        payload: error,
      });
    });
};
