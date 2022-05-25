import axios from "axios";

import {
  CLOSE_CREATED_TICKET,
  CREATE_TICKET,
  CREATE_TICKET_FAILED,
  CREATE_TICKET_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_SUCCESS,
  GET_TICKETS,
  GET_TICKETS_FAILED,
  GET_TICKETS_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESS,
} from "../types/tickets.types";

export const getTicketsMotion = () => (dispatch) => {
  var config = {
    method: "GET",
    url: "/api/cms/tickets",
    headers: {},
  };
  dispatch({
    type: GET_TICKETS,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_TICKETS_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_TICKETS_FAILED,
        payload: error,
      });
    });
};

export const CreateTicket = (newTicket) => (dispatch) => {
  var data = JSON.stringify({
    name: newTicket.name,
    partner_name: newTicket.partner_name,
    description: newTicket.description,
    category_id: parseInt(newTicket.category_id),
    partner_email: newTicket.partner_email,
    file: newTicket.file,
    fileName: newTicket.fileName,
  });
  var config = {
    method: "POST",
    url: "/api/cms/new/ticket",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };
  dispatch({
    type: CREATE_TICKET,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: CREATE_TICKET_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: CREATE_TICKET_FAILED,
        payload: error,
      });
    });
};

export const getMessageTicket = (id) => (dispatch) => {
  var config = {
    method: "GET",
    url: `/api/cms/messages/id=${id}`,
    headers: {},
  };
  dispatch({
    type: GET_MESSAGE,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_MESSAGE_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_MESSAGE_FAILED,
        payload: error,
      });
    });
};

export const SendMessage = (message) => (dispatch) => {
  var data = JSON.stringify({
    jsonrpc: "2.0",
    params: {
      body: message.body,
      id: message.id,
    },
  });
  var config = {
    method: "POST",
    url: "/api/cms/message/new",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };
  dispatch({
    type: SEND_MESSAGE,
    payload: "Loading",
  });
  axios(config)
    .then(function (response) {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: response.data.result,
      });
    })
    .catch(function (error) {
      dispatch({
        type: SEND_MESSAGE_FAILED,
        payload: error,
      });
    });
};

export const closeModalTicket = () => (dispatch) => {
  dispatch({
    type: CLOSE_CREATED_TICKET,
    payload: "close",
  });
};
