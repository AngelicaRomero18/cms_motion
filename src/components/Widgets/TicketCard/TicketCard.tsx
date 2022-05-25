import React, { Component } from "react";
import "./TicketCard.scss";

interface MyProps {
  create_date : any
  background : any
  color : any
  openDetail: any
  number: number
  category: any
  name: string
  email: string
  description: string
}

interface MyState {
  online: boolean;
}

export default class TicketCard extends Component <MyProps, MyState> {
  render() {
    const year = this.props.create_date.split(" ");
    return (
      <div
        className="TicketCard"
        style={{
          backgroundColor: this.props.background,
          color: this.props.color,
        }}
        onClick={this.props.openDetail}
      >
        <div className="cardTableSub column">
          <div className="cardTableSubCont column">
            <div className="cardTableSubCont-center row">
              <div className="number">{this.props.number}</div>
              <div className="category">{this.props.category}</div>
            </div>
            <div className="column">
              <div className="name">{this.props.name}</div>
              <div className="email">{this.props.email}</div>
              <div className="description">{this.props.description}</div>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="dateD">Fecha de creación</div>
              <div className="dateY">{year[0]}</div>
              <div className="dateY">{year[1]}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
