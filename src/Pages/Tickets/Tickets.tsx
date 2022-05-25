import React from "react";
import { User } from "../../Models/user";

export default function Tickets(props: { UserReducer: User }) {
  return <div>{props.UserReducer.name}</div>;
}
