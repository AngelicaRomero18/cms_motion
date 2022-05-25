import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { MotionLoginEmailPassword } from "../../redux/actions/auth.actions";

import Validator from "../Widgets/Validator/Validator";
import BackgrounLogin from "./assets/background.jpg";

import "./SignIn.scss";

const styles = (theme: any) => ({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

interface MyProps {
  MotionLoginEmailPassword: Function;
  login: any;
  onSubmit?: Function;
}

interface MyState {
  tryCreate?: any;
  email: string;
  password: string;
  agreement: string;
  auth: any;
  created?: boolean;
}

class SignIn extends Component<MyProps, MyState> {
  state = {
    tryCreate: "",
    email: "",
    password: "",
    agreement: "",
    auth: localStorage.getItem("auth_user"),
  };
  handleChange = (event: any) => {
    event.persist();
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  };
  handleFormSubmit = (e: any) => {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    console.log(email);
    if (this.state.email && this.state.password) {
      this.props.MotionLoginEmailPassword({ email, password });
      // this.setState({
      //   tryCreate: true,
      // });
    } else {
      this.setState({
        tryCreate: true,
        created: false,
      });
    }
  };
  componentDidMount() {
    if (this.state.auth != null) {
      window.location.replace("/");
    } else {
      console.log("no se encontro auth en local storage");
    }
  }
  render() {
    let email,
      password = this.state;
    let classes: any = this.props;
    return (
      <div className="SignIn bg-gradient">
        <div
          className="bg-photo"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/static/assets/images/background.jpg)`,
          }}
        ></div>

        <div className="bg-gradient-2"></div>

        <div className="logo-motion">
          <a href="http://monitoringinnovation.com">
            <img
              src={`${process.env.PUBLIC_URL}/static/assets/images/motion-logo.svg`}
              alt="motion-logo"
            />
          </a>
        </div>
        <div>
          <form className="form" ref="form">
            <div>Usuario*</div>
            <Validator
              parameter={email}
              tryCreate={this.state.tryCreate}
              placeholder={"Nombre de usuario"}
              error={"Email requerido"}
              handleChange={this.handleChange}
              name={"email"}
            />
            <div>Clave de acceso*</div>
            <Validator
              parameter={password}
              tryCreate={this.state.tryCreate}
              placeholder={"Contraseña"}
              error={"Password requerido"}
              handleChange={this.handleChange}
              name={"password"}
              type="password"
            />
            {this.props.login.error === "Credenciales invalidas" ? (
              <div
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  color: "#c6007e",
                }}
              >
                Credenciales invalidas
              </div>
            ) : null}
            <div className="form-selections">
              <a className="forgotten-password" href="/olvidePassword">
                He olvidado mi contraseña
              </a>
              <br />
              <button
                type="submit"
                className="button-form"
                onClick={this.handleFormSubmit}
              >
                Iniciar sesión
              </button>
              {this.props.login.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              <br />
              <div className="register-option">Registrarme</div>
            </div>
          </form>
        </div>

        <footer className="footer">
          <p>
            &copy; 2021 Copyright
            <a href="http://monitoringinnovation.com">A.B Comercial LTDA</a>
          </p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  MotionLoginEmailPassword: PropTypes.func.isRequired,
  login: state.LoginReducer,
});

export default connect(mapStateToProps, { MotionLoginEmailPassword })(SignIn);
