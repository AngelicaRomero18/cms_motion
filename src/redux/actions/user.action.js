import history from "../../history";
import localStorageService from "../services/localStorageService";
import axios from "axios";
import qs from "qs";

import {
  GET_MYACCOUNT,
  GET_MYACCOUNT_FAILED,
  GET_MYACCOUNT_SUCCESS,
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_MYACCOUNT,
  UPDATE_MYACCOUNT_FAILED,
  UPDATE_MYACCOUNT_SUCCESS,
} from "../types/user.types";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const ADD_USER_TO_MOTION = "ADD_USER_TO_MOTION";
export const ADD_USER_TO_MOTION_SUCCESS = "ADD_USER_TO_MOTION_SUCCESS";
export const DATA_FAILED = "DATA_FAILED";

/* Aqui probare la accion de crear nueva unidad*/
export function createUser({ name, email }) {
  return (dispatch) => {
    let data = qs.stringify({
      name: name,
      email: email,
    });
    console.log(data);
    var config = {
      method: "POST",
      url: "/api/tracking/users",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(
        (response) => {
          if (response.status === 200) {
            console.log(response);
            return response;
          } else {
            var error = new Error("oops, something went wrong");
            console.log(error);
            error.response = response;
            throw error;
          }
        },
        (error) => {
          console.log(error);
          var errmess = new Error(error);
          throw errmess;
        }
      )
      .then((response) => dispatch(createUserSuccess(response.result)))
      .catch((error) => dispatch(dataFailed(error.message)));
  };
}

//Create unit

export function createUserPost(payload) {
  return { type: ADD_USER_TO_MOTION, payload };
}

export function createUserSuccess(payload) {
  const byId = { [payload.result]: payload };
  return { type: ADD_USER_TO_MOTION_SUCCESS, payload: { byId } };
}

export const dataFailed = (errmess) => ({
  type: DATA_FAILED,
  payload: errmess,
});

export function setUserData(user) {
  localStorageService.setItem("auth_user", user);
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      data: user,
    });
  };
}

export function logoutUser() {
  axios
    .get("/web/session/logout")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  return (dispatch) => {
    //motionAuthService.logout(); el axios anterior reemplazaria este llamado
    localStorage.removeItem("auth_user");
    history.push({
      pathname: "/session/login",
    });
    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

export const getUser = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/user",
    headers: {},
  };
  dispatch({
    type: GET_USER,
    payload: "LOADING",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch(function (error) {
      deleteAllCookies();
      // window.location.replace("/web/login/cms");
      dispatch({
        type: GET_USER_FAILED,
        payload: error,
      });
    });
};

export const getMyAccount = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/myaccount",
    headers: {},
  };
  dispatch({
    type: GET_MYACCOUNT,
    payload: "LOADING",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_MYACCOUNT_SUCCESS,
        payload: response.data,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_MYACCOUNT_FAILED,
        payload: error,
      });
    });
};

export const updateMyAccount = (my_account) => (dispatch) => {
  var data = {
    jsonrpc: "2.0",
    params: {
      name: my_account.name,
      email: my_account.email,
      commercial_company_name: my_account.company_name,
      phone: my_account.telefono,
      street: my_account.direccion,
      zip: my_account.postal,
      city: my_account.ciudad,
    },
  };
  var config = {
    method: "POST",
    url: "/api/cms/myaccount/update",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };
  dispatch({
    type: UPDATE_MYACCOUNT,
    payload: "LOADING",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: UPDATE_MYACCOUNT_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: UPDATE_MYACCOUNT_FAILED,
        payload: error,
      });
    });
};
