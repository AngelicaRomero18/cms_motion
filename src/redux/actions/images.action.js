import axios from "axios";

import {
  SAVE_LIST_IMAGES,
  SAVE_LIST_IMAGES_FAILED,
} from "../types/images.types";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const getImagesMotion = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/tracking/units_imgs",
    headers: {},
  };
  axios(config)
    .then(function (response) {
      dispatch({
        type: SAVE_LIST_IMAGES,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      deleteAllCookies();
      dispatch({
        type: SAVE_LIST_IMAGES_FAILED,
        payload: error,
      });
    });
};
