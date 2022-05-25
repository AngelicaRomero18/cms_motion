import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth.actions";
import "./Settings.scss";

const mapStateToProps = (state: any) => {
  return {
    sidenav: state.SidenavReducer.sidenav,
    elementSelected: state.SidenavReducer.elementSelected,
    user: state.UserReducer.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

interface MyProps {
  ViewSettings: any;
  logout: any;
}

interface MyState {}

class Settings extends Component<MyProps, MyState> {
  render() {
    return (
      <div className="backModal">
        <div className="column frontModal">
          <a className="account-menu-text" href="/my/account">
            Mi cuenta
          </a>
          <a className="account-menu-text" href="/my/security">
            Seguridad
          </a>
          <a
            className="account-menu-text"
            href="/web/login/cms"
            onClick={this.props.logout}
          >
            Cerrar sesion
          </a>
        </div>
        <div className="backModal" onClick={this.props.ViewSettings}></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
