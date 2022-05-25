import axios from "axios";
import {
  GET_SIDENAV,
  GET_SIDENAV_SUCCESS,
  GET_SIDENAV_FAILED,
  SELECT_ELEMENT_SIDENAV,
} from "../types/sidenav.types";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const getSideNav = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/sidenav",
    headers: {},
  };
  dispatch({ type: GET_SIDENAV, payload: "loading" });
  console.log("entro al side bien");
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_SIDENAV_SUCCESS,
        payload: response.data.result,
      });
      console.log("lo obtuvo");
    })
    .catch(function (error) {
      deleteAllCookies();
      console.log("f no lo obtuvo");
      dispatch({
        type: GET_SIDENAV_FAILED,
        payload: error,
      });
    });
};

export function SelectSideNav(id) {
  let id_select = parseInt(id);
  let Element;
  return (dispatch, getState) => {
    const { SidenavReducer } = getState();
    console.log(getState());
    Element = SidenavReducer.sidenav.filter((item) => item.id === id_select);

    dispatch({ type: SELECT_ELEMENT_SIDENAV, payload: Element[0].id });
  };
}
