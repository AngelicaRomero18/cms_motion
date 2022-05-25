import React, { Component } from "react";
import { ReactComponent as LogoCreated } from "../../img/CreatedIco.svg";
import { ReactComponent as LogoError } from "../../img/Eliminar.svg";
import "./ModalCreated.scss";

interface MyProps {
  exit?: any;
  title?: any;
  error?: any;
  loading?: boolean;
  succes?: boolean;
}

interface MyState {}

export default class ModalCreated extends Component<MyProps, MyState> {
  render() {
    return (
      <div className="backModal">
        <div className="column frontModal">
          {this.props.loading ? (
            <img
              src={`${process.env.PUBLIC_URL}/static/assets/images/motion-small-loader.gif`}
              className="logo"
              alt=""
            />
          ) : (
            <>
              <div>
                {this.props.error ? (
                  <LogoError className="logo error" />
                ) : (
                  <LogoCreated className="logo" />
                )}
              </div>
              <div className="title">{this.props.title}</div>
            </>
          )}
        </div>
        <div className="backModal" onClick={this.props.exit}></div>
      </div>
    );
  }
}
