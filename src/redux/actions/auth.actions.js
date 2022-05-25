import { setUserData } from "./user.action";
import history from "../../history";
import Cookies from "js-cookie";
import localStorageService from "../services/localStorageService";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  RESET_PASSWORD,
  LOGOUT,
} from "../types/auth.types";

export function resetPassword({ email }) {
  return (dispatch) => {
    dispatch({ payload: email, type: RESET_PASSWORD });
  };
}

export function MotionLoginEmailPassword({ email, password }) {
  return (dispatch) => {
    var data = JSON.stringify({
      jsonrpc: "2.0",
      params: {
        login: email,
        password: password,
        db: "motion",
      },
    });
    console.log("se enviara la siguiente data por post: ");
    var config = {
      method: "POST",
      url: "/api/cms/auth/",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log("Credenciales invalidas");
          localStorage.removeItem("auth_user");
          dispatch({
            type: LOGIN_ERROR,
            payload: "Credenciales invalidas",
          });
        } else {
          console.log(res.data.result);
          var user_server_data = res.data.result;

          let sessionId = user_server_data.session_id;
          console.log("session_id: " + sessionId);
          Cookies.set("aux_session", sessionId);
          console.log(document.cookie);
          // guardamos el usuario en las cookies test.
          let user = {
            userId: user_server_data.uid,
            role: "ADMIN",
            displayName: user_server_data.partner_display_name,
            email: user_server_data.username,
            photoURL: "/assets/images/face-7.jpg",
            age: 25,
            token: user_server_data.session_id,
            ...res,
          };
          // session id?
          window.location.replace("/Tickets");
          dispatch(setUserData(user));
          return dispatch({ type: LOGIN_SUCCESS });
        }
      })
      .catch(function (error) {
        console.log(error);
        history.push({
          pathname: "/session/login",
        });
        return dispatch({ type: LOGIN_ERROR, payload: error });
      });
  };
}

export const logout = () => (dispatch) => {
  localStorage.clear();

  dispatch({
    type: LOGOUT,
  });
};
