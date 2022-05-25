import { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import Cuentas from "./Pages/Cuentas/Cuentas";
// import Facturas from "./facturas/Facturas.jsx";
// import SideNav from "./sidenav/SideNav.jsx";
// import Units from "./unidades/Units.jsx";
// import Usuarios from "./usuarios/Usuarios.jsx";
// import MyTickets from "./tickets/MyTickets.jsx";
import { connect, ConnectedProps } from "react-redux";

import { getCoolorsMotion } from "./redux/actions/colors.action";
import { getImagesMotion } from "./redux/actions/images.action";
import { getSideNav } from "./redux/actions/sidenav.action";
// import Chat from "../widgets/Chat/Chat.jsx";
// import SignIn from "../session/SignIn/SignIn.jsx";
// import Tutoriales from "./tutoriales/Tutoriales.jsx";
// import Video from "./video/Video.jsx";
import { NewAccount } from "./Models/NewAccount.js";
import App from "./App";
import Chat from "./components/Widgets/Chat/Chat";
import Facturas from "./Pages/facturas/Facturas";
import Video from "./Pages/video/Video";
import Tutoriales from "./Pages/tutoriales/Tutoriales";

const mapStateToProps = (state: any) => {
  return {
    sidenav: state.SidenavReducer.sidenav,
    elementSelected: state.SidenavReducer.elementSelected,
    isLoading: state.SidenavReducer.isLoading,
    user: state.UserReducer.user,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getCoolorsMotion: () => {
    dispatch(getCoolorsMotion());
  },
  getImagesMotion: () => {
    dispatch(getImagesMotion());
  },
  getSideNav: () => {
    dispatch(getSideNav());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface MyProps {
  sidenav: any;
  elementSelected: any;
  item: any;
  user: any;
  setTicket: any;
  isLoading: any;
}

interface MyState {
  sideMenu: string[];
  viewVisible: any;
  auth: any;
}

class Main extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.changeVisible = this.changeVisible.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
  }
  componentDidMount() {
    if (this.props.sidenav) {
      const viewVisible = this.props.sidenav.filter((item: any) => {
        return item.id === this.props.elementSelected;
      });
      this.setState({
        viewVisible: viewVisible[0],
      });
    }
  }

  componentDidUpdate(prevPorps: any) {
    if (
      this.props.sidenav &&
      prevPorps.elementSelected !== this.props.elementSelected
    ) {
      const viewVisible = this.props.sidenav.filter((item: any) => {
        return item.id === this.props.elementSelected;
      });
      this.setState({
        viewVisible: viewVisible[0],
      });
    }
  }

  changeVisible(id: any) {
    let sideMenu = this.state.sideMenu;
    sideMenu.map((e: any) => {
      return (e.isVisible = false);
    });
    const item: any = sideMenu.find((e: any) => e.id === id);
    item.isVisible = !item.isVisible;
    this.selectMenu(item);
    this.setState({
      sideMenu: sideMenu,
    });
  }
  selectMenu(item: any) {
    const item2 = this.state.sideMenu.find((e: any) => e.title === item.title);
    this.setState({
      viewVisible: item2,
    });
  }
  render() {
    return (
      <div className="main row">
        {this.state.viewVisible ? (
          <>
            {this.state.auth ? (
              <>
                {/* <SideNav
                  sideMenu={this.state.sideMenu}
                  changeVisible={this.changeVisible}
                  selectMenu={this.selectMenu}
                  isVisible={this.state.viewVisible.title}
                  user={this.props.user}
                /> */}
                {/* <Route
                  exact
                  path={["/", "/Tickets", "/my", "/cms_motion_react"]}
                >
                  <MyTickets setTicket={this.props.setTicket} />
                </Route>
                <Route exact path="/Unidades">
                  <Units />
                </Route> */}
                <Route exact path="/Facturacion">
                  <Facturas />
                </Route>
                {/* <Route exact path="/Usuarios">
                  <Usuarios />
                </Route> */}
                <Route exact path="/cuentas">
                  <Cuentas />
                </Route>
                <Route exact path="/Tutoriales">
                  <Tutoriales />
                </Route>
                <Route exact path="/Tutoriales/:id">
                  <Video />
                </Route>
                {<Chat />}
              </>
            ) : null}
          </>
        ) : null}
      </div>
    );
  }
}

export default connector(Main);
