import axios from "axios";
import {
  GET_NUMBERS,
  GET_MESSAGES,
  SEND_SMS,
  GET_NUMBERS_SUCCESS,
  GET_NUMBERS_FAILED,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILED,
  SEND_SMS_SUCCESS,
  SEND_SMS_FAILED,
  CLOSE_CREATED,
} from "../types/sms.types";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const getNumbers = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/topconnect/getNumbers",
    headers: {},
  };
  dispatch({
    type: GET_NUMBERS,
    payload: "LOADING",
  });
  console.log("entro aca otra vez");
  axios(config)
    .then(function (response) {
      console.log(response);
      dispatch({
        type: GET_NUMBERS_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      console.log(error);
      deleteAllCookies();
      dispatch({
        type: GET_NUMBERS_FAILED,
        payload: error,
      });
    });
};

export const getMessages = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/topconnect/getMessages",
    headers: {},
  };
  dispatch({
    type: GET_MESSAGES,
    payload: "LOADING",
  });
  console.log("y aca otra vez");
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      deleteAllCookies();
      dispatch({
        type: GET_MESSAGES_FAILED,
        payload: error,
      });
    });
};

export const sendMessage = (newMessage) => (dispatch) => {
  var data = {
    jsonrpc: "2.0",
    params: {
      from: newMessage.from,
      to: newMessage.to,
      msg: newMessage.msg,
    },
  };
  console.log(data);
  var config = {
    method: "POST",
    url: "/api/topconnect/send",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };
  dispatch({
    type: SEND_SMS,
    payload: "LOADING",
  });
  axios(config)
    .then(function (response) {
      console.log(response);
      dispatch({
        type: SEND_SMS_SUCCESS,
        payload: response.data.result,
      });
      getNumbers();
      getMessages();
    })
    .catch(function (error) {
      deleteAllCookies();
      console.log(error);
      dispatch({
        type: SEND_SMS_FAILED,
        payload: error,
      });
    });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_CREATED,
    payload: "close",
  });
};

/**
 *   setparam 2005:12345
 *   setparam 2004:12345
 *
 * setparam 2001:APN;2002:APN_username;2003:APN_password;2004:Domain;2004:Port;2005:0"
 *
 */
