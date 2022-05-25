import React, { Component } from "react";
import { ReactComponent as MasButton } from "../../../img/Mas.svg";
import { NewAccount } from "../../Models/NewAccount";
import { connect } from "react-redux";
import Validator from "../../components/Widgets/Validator/Validator";
import Pagination from "../../components/Pagination/Pagination";
import "./Cuentas.scss";
import ModalCreated from "../../components/Widgets/ModalCreated/ModalCreated";
import TableDesktop from "../../components/Table/TableDesktop/TableDesktop";

const mapStateToProps = (state: any) => {
  return {
    AccountsReducer: state.AccountsReducer,
  };
};

interface MyProps {
  //   NewAccount: NewAccount;
  AccountsReducer: any;
}

interface MyState {
  newAccount: NewAccount;
  ModalCreated: ModalCreated;
  created: boolean;
  tryCreate: boolean;
  pageSize: string;
  accounts: any;
  itemsP: any;
  createOp: string;
  arrayTb: {};
  modalView: boolean;
  accountCreated: any;
  isLoadingCreate: boolean;
  errorCreated: boolean;
  errorMessage: boolean;
}

class Cuentas extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.paginate = this.paginate.bind(this);
    this.delete = this.delete.bind(this);
    this.viewModalHandle = this.viewModalHandle.bind(this);
    this.setAccountCreated = this.setAccountCreated.bind(this);
    this.crear = this.crear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateOp = this.handleCreateOp.bind(this);
    this.exitCreated = this.exitCreated.bind(this);
  }
  componentDidMount() {
    this.setState({
      accounts: this.props.AccountsReducer.accounts,
    });
  }
  componentDidUpdate(prevPorps: any) {
    if (
      prevPorps.AccountsReducer.accounts !== this.props.AccountsReducer.accounts
    ) {
      this.setState({
        accounts: this.props.AccountsReducer.accounts,
      });
    }
  }
  viewModalHandle() {
    this.setState({
      modalView: !this.state.modalView,
    });
  }
  handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      newAccount: {
        ...this.state.newAccount,
        [name]: value,
      },
    });
  }

  handleCreateOp(event: any) {
    const target = event.target;
    const value = target.value;
    this.setState({
      createOp: value,
    });
  }

  crear(e: any) {
    e.preventDefault();
    //peticion ajax
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        jsonrpc: "2.0",
        params: {
          name: this.state.newAccount.name,
          facturacion: 1,
          email: this.state.newAccount.email,
          creador: this.state.newAccount.creador,
          createType: this.state.createOp,
        },
      }),
      requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      };

    if (this.state.createOp === "Usuario existente") {
      if (this.state.newAccount.name) {
        this.setState({
          isLoadingCreate: true,
        });
        fetch("/api/cms/accounts/new", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const newResult = JSON.parse(result);
            if (newResult.error) {
              this.setState({
                errorCreated: true,
                isLoadingCreate: false,
              });
            } else {
              this.setState({
                created: true,
                isLoadingCreate: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              errorCreated: true,
              isLoadingCreate: false,
              errorMessage: error,
            });
          });
        this.setState({
          newAccount: {
            name: "",
          },
          tryCreate: false,
        });
      } else {
        this.setState({
          created: false,
          tryCreate: true,
        });
      }
    } else {
      if (this.state.newAccount.name && this.state.newAccount.email) {
        this.setState({
          isLoadingCreate: true,
        });
        fetch("/api/cms/accounts/new", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const newResult = JSON.parse(result);
            if (newResult.error) {
              this.setState({
                errorCreated: true,
                isLoadingCreate: false,
              });
            } else {
              this.setState({
                created: true,
                isLoadingCreate: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              errorCreated: true,
              isLoadingCreate: false,
              errorMessage: error,
            });
          });
        this.setState({
          newAccount: {
            name: "",
          },
          tryCreate: false,
        });
      } else {
        this.setState({
          created: false,
          tryCreate: true,
        });
      }
    }
  }

  delete(id: any) {
    //peticion ajax
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(id);
    var data = JSON.stringify({
        jsonrpc: "2.0",
        params: {
          model: "motion.tracking_account",
          rec_id: id,
        },
      }),
      requestOptions: any = {
        method: "DELETE",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      };

    fetch("/api/tracking/remove", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  paginate(paginateView: any) {
    const arrayTb = paginateView.map((item: any) => [
      item.id,
      item.name,
      item.creador,
      item.creador,
      item.facturacion,
      item.facturacion,
      item.saldo,
      item.dias,
      item.estado,
      item.bloqueado,
      "X",
    ]);

    this.setState({
      itemsP: paginateView,
      arrayTb: arrayTb,
    });
  }
  exitCreated() {
    this.setState({
      errorCreated: false,
      created: false,
    });
  }
  setAccountCreated(option: any) {
    if (option === 1) {
      this.setState({
        accountCreated: true,
      });
    } else if (option === 2) {
      this.setState({
        accountCreated: "Error",
      });
    } else if (option === 3) {
      this.setState({
        accountCreated: "Loading",
      });
    } else {
      this.setState({
        accountCreated: false,
      });
    }
  }
  render() {
    const items = [
      [
        "#",
        "Nombre",
        "Creador",
        "Cuenta padre",
        "Facturacion",
        "Unidades",
        "Saldo",
        "Dias",
        "Estado",
        "Bloqueada",
      ],
      [this.state.arrayTb],
    ];
    // return (
    //   <>
    //     <div className="row cuentasStyle">
    //       <div
    //         className="column"
    //         style={{ margin: "5px auto", justifyContent: "space-between" }}
    //       >
    //         {this.state.itemsP ? (
    //           <TableMobile
    //             items={items}
    //             delete={true}
    //             deleteFunction={this.delete}
    //           />
    //         ) : null}
    //         <div className="row" style={{ justifyContent: "space-between" }}>
    //           <Pagination
    //             items={this.props.AccountsReducer.accounts}
    //             paginate={this.paginate}
    //             mobile={true}
    //           />
    //           <button className="btn5" onClick={this.viewModalHandle}>
    //             <MasButton />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     {this.state.modalView ? (
    //       <ModalAccounts
    //         viewModalHandle={this.viewModalHandle}
    //         setAccountCreated={this.setAccountCreated}
    //       />
    //     ) : null}
    //     {this.state.accountCreated === "Loading" ? (
    //       <ModalCreated loading={true} />
    //     ) : this.state.accountCreated === "Error" ? (
    //       <ModalCreated
    //         title="Error en la creacion del ticket"
    //         error={true}
    //         exit={this.setAccountCreated}
    //       />
    //     ) : this.state.accountCreated ? (
    //       <ModalCreated
    //         title="Ticket creado exitosamente!"
    //         success={true}
    //         exit={this.setAccountCreated}
    //       />
    //     ) : null}
    //   </>
    // );

    return (
      <div className="main-content-box">
        <div className="margin-auto">
          <div>
            <form className="form-tickets column formStyle" noValidate>
              <div className="row">
                <div className="column c1">
                  <div
                    className="row"
                    style={{ justifyContent: "space-evenly" }}
                  >
                    <div className="form-tickets-item column marginR sectCheck">
                      <select
                        className="selectInput"
                        onChange={(event) => this.handleCreateOp(event)}
                      >
                        <option value="Usuario existente">
                          Usuario existente
                        </option>
                        <option value="Nuevo usuario">Nuevo usuario</option>
                      </select>
                    </div>
                    {this.state.createOp === "Nuevo usuario" ? (
                      <>
                        <div className="form-tickets-item margin">
                          <select name="category_id" className="selectInput">
                            <option hidden selected>
                              Creador
                            </option>
                            <option>Nuevo usuario</option>
                          </select>
                        </div>
                        <div className="form-tickets-item marginR">
                          <Validator
                            parameter={this.state.newAccount.name}
                            tryCreate={this.state.tryCreate}
                            placeholder={"Nombre"}
                            error={"Nombre inválido"}
                            handleChange={this.handleChange}
                            name={"name"}
                          />
                        </div>
                        <div className="form-tickets-item marginR">
                          <Validator
                            name={"email"}
                            placeholder={"Correo electrónico"}
                            parameter={this.state.newAccount.email}
                            tryCreate={this.state.tryCreate}
                            handleChange={this.handleChange}
                            error={"Email invalido"}
                          />
                        </div>
                        <div className="form-tickets-item marginR">
                          <select name="category_id selectInput ">
                            <option hidden selected>
                              Facturación
                            </option>
                            <option>Facturación</option>
                          </select>
                        </div>
                      </>
                    ) : this.state.createOp === "Usuario existente" ? (
                      <>
                        <div
                          className="form-tickets-item marginR"
                          style={{
                            width: "-webkit-fill-available",
                          }}
                        >
                          <Validator
                            parameter={this.state.newAccount.name}
                            tryCreate={this.state.tryCreate}
                            placeholder={"Nombre"}
                            error={"Nombre inválido"}
                            handleChange={this.handleChange}
                            name={"name"}
                          />
                        </div>
                        <div
                          className="form-tickets-item marginR "
                          style={{
                            width: "-webkit-fill-available",
                          }}
                        >
                          <select name="category_id" className="selectInput">
                            <option hidden selected>
                              Facturación
                            </option>
                            <option>Facturación</option>
                          </select>
                        </div>
                      </>
                    ) : null}
                    <div className="displayFlex">
                      <div
                        className="btn5 button"
                        onClick={(e) => this.crear(e)}
                      >
                        <MasButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <Pagination
            items={this.props.AccountsReducer.accounts}
            paginate={this.paginate}
          />
          {this.state.itemsP ? (
            <TableDesktop
              items={items}
              delete={true}
              deleteFunction={this.delete}
            />
          ) : null}
        </div>
        {this.state.isLoadingCreate ? (
          <ModalCreated loading={true} />
        ) : this.state.errorCreated ? (
          <ModalCreated
            error={true}
            title={"Ocurrio un error en la creacion de la cuenta"}
            exit={this.exitCreated}
          />
        ) : this.state.created ? (
          <ModalCreated
            succes={true}
            title={"Cuenta creada con éxito!"}
            exit={this.exitCreated}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cuentas);
