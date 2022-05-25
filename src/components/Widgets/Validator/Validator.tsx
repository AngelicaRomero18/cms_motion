import React, { Component } from "react";
import "./Validator.scss";

interface MyProps {
  parameter?: any;
  width?: any;
  placeholder?: any;
  name?: any;
  handleChange?: any;
  tryCreate?: any;
  className?: any;
  error?: any;
  type?: any;
}

interface MyState {}

export default class Validator extends Component<MyProps, MyState> {
  render() {
    return (
      <>
        {this.props.parameter ? (
          <input
            style={{
              width: this.props.width
                ? this.props.width
                : "-webkit-fill-available",
            }}
            placeholder={this.props.placeholder}
            value={this.props.parameter}
            name={this.props.name}
            onChange={this.props.handleChange}
            className={this.props.className + "input"}
          ></input>
        ) : this.props.tryCreate ? (
          <>
            <input
              style={{
                width: this.props.width
                  ? this.props.width
                  : "-webkit-fill-available",
              }}
              placeholder={this.props.placeholder}
              value={this.props.parameter}
              name={this.props.name}
              onChange={this.props.handleChange}
              className={this.props.className + "tryCreateInput input"}
            ></input>
            <div className="tryCreateText">{this.props.error}</div>
          </>
        ) : (
          <input
            style={{
              width: this.props.width
                ? this.props.width
                : "-webkit-fill-available",
            }}
            placeholder={this.props.placeholder}
            value={this.props.parameter}
            name={this.props.name}
            onChange={this.props.handleChange}
            className={this.props.className + "input"}
          ></input>
        )}
      </>
    );
  }
}
