import axios from "axios";
import {
  SAVE_LIST_COOLORS,
  SAVE_LIST_COOLORS_FAILED,
} from "../types/colors.types";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const getCoolorsMotion = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/tracking/coolors",
    headers: {},
  };
  axios(config)
    .then(function (response) {
      dispatch({
        type: SAVE_LIST_COOLORS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      deleteAllCookies();
      dispatch({
        type: SAVE_LIST_COOLORS_FAILED,
        payload: error,
      });
    });
};
