import { Component } from "react";
import Tour from "reactour";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import "./scss/index.scss";

import Main from "./Main";

import { getCoolorsMotion } from "./redux/actions/colors.action";
import { getImagesMotion } from "./redux/actions/images.action";
import { getSideNav } from "./redux/actions/sidenav.action";
import { getMessages, getNumbers } from "./redux/actions/sms.action";
import { getUser } from "./redux/actions/user.action";
import { getTicketsMotion } from "./redux/actions/tickets.action";
import { getUsersTracking } from "./redux/actions/users.action";
import { getAccountsTracking } from "./redux/actions/accounts.action";
import { getUnitsTracking } from "./redux/actions/units.actions";
import { getInvoicesTracking } from "./redux/actions/invoices.actions";
import { getCategories } from "./redux/actions/category.action";
import { getTutorialesMotion } from "./redux/actions/tutoriales.action";
import SignIn from "./components/SignIn/SignIn";
// import SignIn from "./components/session/SignIn/SignIn";

const mapStateToProps = (state: any) => {
  return {
    sidenav: state.SidenavReducer.sidenav,
    elementSelected: state.SidenavReducer.elementSelected,
    sidenavIsLoading: state.SidenavReducer.isLoading,
    UserIsLoading: state.UserReducer.isLoading,
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
  getNumbers: () => {
    dispatch(getNumbers());
  },
  getMessages: () => {
    dispatch(getMessages());
  },
  getUser: () => {
    dispatch(getUser());
  },
  getTicketsMotion: () => {
    dispatch(getTicketsMotion());
  },
  getUsersTracking: () => {
    dispatch(getUsersTracking());
  },
  getAccountsTracking: () => {
    dispatch(getAccountsTracking());
  },
  getUnitsTracking: () => {
    dispatch(getUnitsTracking());
  },
  getInvoicesTracking: () => {
    dispatch(getInvoicesTracking());
  },
  getCategories: () => {
    dispatch(getCategories());
  },
  getTutorialesMotion: () => {
    dispatch(getTutorialesMotion());
  },
});

interface MyProps {
  getCoolorsMotion(): any;
  getImagesMotion(): any;
  getSideNav(): any;
  getNumbers(): any;
  getMessages(): any;
  getUser(): any;
  getTicketsMotion(): any;
  getUsersTracking(): any;
  getAccountsTracking(): any;
  getUnitsTracking(): any;
  getInvoicesTracking(): any;
  getCategories(): any;
  getTutorialesMotion(): any;
  UserIsLoading: any;
  sidenavIsLoading: any;
}
interface MyState {
  tickets: any;
  user: any;
  accounts: any;
  units: any;
  users: any;
  facturas: any;
  category: {};
  isTourOpen: boolean;
  isShowingMore: boolean;
  auth: any;
}
class App extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tickets: [],
      user: "",
      accounts: [],
      units: [],
      users: [],
      facturas: [],
      category: [],
      isTourOpen: false,
      isShowingMore: false,
      auth: null,
    };
  }

  componentDidMount() {
    this.props.getCoolorsMotion();
    this.props.getImagesMotion();
    this.props.getSideNav();
    this.props.getNumbers();
    this.props.getMessages();
    this.props.getUser();
    this.props.getTicketsMotion();
    this.props.getUsersTracking();
    this.props.getAccountsTracking();
    this.props.getUnitsTracking();
    this.props.getInvoicesTracking();
    this.props.getCategories();
    this.props.getTutorialesMotion();
  }

  fetchLogout() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch("/web/session/logout", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const newResult = JSON.parse(result);
        this.setState({
          user: newResult.user[0],
        });
      })
      .catch((error) => console.log("error", error));
  }

  setTicket(newTicket: any) {
    this.setState({
      tickets: {
        ...this.state.tickets,
        count: this.state.tickets.count + 1,
        result: [{ ...newTicket }, ...this.state.tickets.result],
      },
    });
  }

  toggleShowMore = () => {
    this.setState((prevState) => ({
      isShowingMore: !prevState.isShowingMore,
    }));
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    var screen = window.screen.width;
    return (
      <div>
        <Router>
          {!this.state.auth ? (
            <Redirect from="*" to="/login/cms" />
          ) : (
            <Redirect from="*" to="/Tickets" />
          )}
          <Switch>
            {!this.props.UserIsLoading && !this.props.sidenavIsLoading ? (
              screen > 600 ? (
                <>
                  {/* <MainDesktop
                    setTicket={(newTicket: any) => this.setTicket(newTicket)}
                  /> */}
                </>
              ) : (
                <>
                  {/* <MainMobile
                    setTicket={(newTicket: any) => this.setTicket(newTicket)}
                  /> */}
                </>
              )
            ) : (
              <div className="matx-loader">
                <img
                  src={`${process.env.PUBLIC_URL}/static/assets/images/logo.png`}
                  alt=""
                />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </Switch>
          <Route exact path={["/login/cms", "/web/login"]}>
            <SignIn />
          </Route>
        </Router>
      </div>
    );
  }
}

const steps = [
  {
    selector: ".Presentation",
    content:
      "Bienvenido a CMS MOTION, nos alegra que estes aqui. Primeramente te daremos una breve guia de como funciona esta aplicacion.",
  },
  {
    selector: '[data-tut="sideNav"]',
    content:
      "En este menu de navegacion encontraras los diferentes modulos a los que puedes acceder y tus datos de usuario",
  },
  {
    selector: '[data-tut="dataUser"]',
    content:
      "En este item puedes ver tus datos de usuario y acceder a algunas opciones de seguridad",
  },
  {
    selector: '[data-tut="sideItemTicket"]',
    content: "Con este item puedes acceder al modulo de tickets",
  },
  {
    selector: '[data-tut="moduleTickets"]',
    content:
      "Este es el modulo de tickets donde podras crear y ver el estado de tus tickets",
  },
  {
    selector: '[data-tut="formTickets"]',
    content: "Este es el formulario para la creacion de tickets",
  },
  {
    selector: '[data-tut="newTickets"]',
    content: "En este espacio puede ver tus tickets recien creados",
  },
  {
    selector: '[data-tut="pdtATickets"]',
    content:
      "En este espacio puede ver tus tickets que estan pendientes por asignacion o en proceso",
  },
  {
    selector: '[data-tut="ccTickets"]',
    content:
      "En este espacio puedes ver los tickets que ya fueron contestados o cancelados",
  },
  // pdtATickets ...
];

export default connect(mapStateToProps, mapDispatchToProps)(App);
