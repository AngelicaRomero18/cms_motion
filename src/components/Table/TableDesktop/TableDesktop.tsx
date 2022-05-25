import React, { Component } from "react";
import { ReactComponent as ElimininarIco } from "../../../img/Eliminar.svg";
import "./TableDesktop.scss";

interface MyProps {
  items?: any;
  delete?: any;
  deleteFunction?: Function;
}

interface MyState {
  arrayDinamic: any;
  openDeleteForm: boolean;
  idSelected: string;
  selected: number;
  items: any;
}
export default class TableDesktop extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      arrayDinamic: null,
      openDeleteForm: false,
      idSelected: "",
      selected: 0,
      items: null,
    };
    this.initArray = this.initArray.bind(this);
    this.openDeleteForm = this.openDeleteForm.bind(this);
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    this.setState({
      items: this.props.items[1][0],
    });
    this.initArray({ data: this.props.items });
  }
  componentDidUpdate(prevProps: any) {
    if (prevProps.items !== this.props.items) {
      this.setState({
        items: this.props.items[1][0],
      });
    }
  }
  initArray(value: any) {
    let data;
    let arrayDinamic;
    let i;
    let limit;

    arrayDinamic = [];
    i = 0;
    data = value.data;
    limit = data[0].length;
    for (i; i < limit; i++) {
      arrayDinamic.push({ i });
    }
    this.setState({
      arrayDinamic: arrayDinamic,
    });
  }
  openDeleteForm(id?: any) {
    if (id) {
      this.setState({
        openDeleteForm: !this.state.openDeleteForm,
        idSelected: id,
      });
    } else {
      this.setState({
        openDeleteForm: !this.state.openDeleteForm,
      });
    }
  }
  filter(id: any) {
    this.setState({
      selected: id,
    });
    let items = this.state.items;
    items.sort(sortFunction);
    function sortFunction(a: any, b: any) {
      if (a[id] < b[id]) {
        if (a[id] === b[id]) {
          return 0;
        } else {
          return a[id] < b[id] ? -1 : 1;
        }
      } else {
        if (a[id] === b[id]) {
          return 0;
        } else {
          return a[id] > b[id] ? -1 : 1;
        }
      }
    }
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <div
        className="row"
        style={{
          width: "100%",
          height: "max-content",
          justifyContent: "center",
        }}
      >
        <div
          style={{ overflowX: "auto", width: "100%", height: "max-content" }}
        >
          <table
            style={{
              height: "-webkit-fill-available",
              width: "-webkit-fill-available",
            }}
          >
            <thead>
              <tr>
                {this.state.arrayDinamic
                  ? this.state.arrayDinamic.map((item: any) => {
                      return (
                        <React.Fragment key={item.i}>
                          {this.state.selected === item.i ? (
                            <th
                              className="thSelected"
                              onClick={() => this.filter(item.i)}
                            >
                              {this.props.items[0][item.i]}
                            </th>
                          ) : (
                            <th
                              className="th"
                              key={item.i}
                              onClick={() => this.filter(item.i)}
                            >
                              {this.props.items[0][item.i]}
                            </th>
                          )}
                        </React.Fragment>
                      );
                    })
                  : null}
                {this.props.delete ? <th className="th">Eliminar</th> : null}
              </tr>
            </thead>
            <tbody>
              {/*td*/}
              {this.props.items
                ? this.props.items[1][0].map((item1: any) => {
                    return (
                      <tr key={item1.id}>
                        {this.state.arrayDinamic
                          ? this.state.arrayDinamic.map((item2: any) => {
                              return (
                                <td className="td" key={item2.i}>
                                  {item1[item2.i]}
                                </td>
                              );
                            })
                          : null}
                        {this.props.delete ? (
                          <>
                            <td
                              className="td  eliminar"
                              onClick={() => {
                                this.openDeleteForm(item1[0]);
                              }}
                            >
                              <ElimininarIco className="eliminar-ico" />
                            </td>
                          </>
                        ) : null}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        {this.state.openDeleteForm ? (
          <div className="eliminarBack">
            <div className="eliminarBack" onClick={this.openDeleteForm}></div>
            <div className="column eliminarForm">
              <div>Estas seguro ?</div>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  width: "50%",
                  marginTop: "20px",
                }}
              >
                <div
                  onClick={() => {
                    this.openDeleteForm();
                    if (this.props.deleteFunction)
                      this.props.deleteFunction(this.state.idSelected);
                  }}
                  className="confirmar"
                >
                  Si
                </div>
                <div className="cancelari" onClick={this.openDeleteForm}>
                  Cancelar
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
