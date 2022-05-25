import { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import TableDesktop from "../../components/Table/TableDesktop/TableDesktop";
import { NewInvoice } from "../../Models/NewInvoice";

const mapStateToProps = (state: any) => {
  return {
    InvoicesReducer: state.InvoicesReducer,
  };
};
interface MyProps {
  InvoicesReducer: any;
}

interface MyState {
  NewInvoice?: NewInvoice;
  created: boolean;
  tryCreate: boolean;
  pageSize: string;
  facturas: any;
  itemsP: any;
  users?: any;
  arrayTb?: any;
}

class Facturas extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      created: false,
      tryCreate: false,
      pageSize: "",
      facturas: null,
      itemsP: null,
    };
    this.crear = this.crear.bind(this);
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.setState({
      users: this.props.InvoicesReducer.invoices,
    });
  }
  componentDidUpdate(prevPorps: any) {
    if (
      prevPorps.InvoicesReducer.invoices !== this.props.InvoicesReducer.invoices
    ) {
      this.setState({
        facturas: this.props.InvoicesReducer.invoices,
      });
    }
  }
  handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      NewInvoice: {
        ...this.state.NewInvoice,
        [name]: value,
      },
    });
  }
  crear(e: any) {
    e.preventDefault();
    //peticion ajax
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        name: "Test 2",
        facturacion: 1,
      }),
      requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      };

    fetch("http://localhost:8069/api/cms/accounts/new", requestOptions)
      .then((response) => response.text())
      .then((result) => {})
      .catch((error) => console.log("error", error));

    this.setState({
      created: true,
      tryCreate: false,
    });
  }
  delete(id: any) {
    //peticion ajax
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        id: id,
      }),
      requestOptions: any = {
        method: "DELETE",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      };

    fetch("http://localhost:8069/api/cms/accounts/delete", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }
  paginate(paginateView: any) {
    const arrayTb = paginateView.map((item: any) => [
      item.id,
      item.name, //Nombre
      false, //Creador
      false, //Cuenta padre
      false, //Facturacion
      false, //Unidades
      false, //Saldo
      false, //Dias
      false, //estado
      false, //Bloqueada
    ]);
    this.setState({
      itemsP: paginateView,
      arrayTb: arrayTb,
    });
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
    return (
      <div className="main-content-box">
        <div className="margin-auto">
          <Pagination
            items={this.props.InvoicesReducer.invoices}
            paginate={this.paginate}
          />
          {this.state.itemsP ? <TableDesktop items={items} /> : null}
        </div>
      </div>
    );
    // movil
    // return (
    //   <>
    //     <div className="row" style={{ ...cuentasStyle }}>
    //       <div
    //         className="column"
    //         style={{ margin: "5px auto", justifyContent: "space-between" }}
    //       >
    //         {this.state.itemsP ? (
    //           <TableMobile items={items} delete={true} />
    //         ) : null}
    //         <div className="row" style={{ justifyContent: "space-between" }}>
    //           <Pagination
    //             items={this.props.InvoicesReducer.invoices}
    //             paginate={this.paginate}
    //             mobile={true}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // );
  }
}

export default connect(mapStateToProps)(Facturas);
