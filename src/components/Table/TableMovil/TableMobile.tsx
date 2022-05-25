import React, { Component } from "react";
import { ReactComponent as ElimininarIco } from "../../../img/Eliminar.svg";
import "./TableMobile.scss";

interface MyProps {
  items: any;
  delete: any;
  deleteFunction: Function;
}

interface MyState {
  arrayDinamic: any;
  openDeleteForm: boolean;
  selected: number;
  items: any;
  idSelected: any;
}

export default class TableMobile extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      arrayDinamic: null,
      openDeleteForm: false,
      selected: 0,
      items: null,
      idSelected: null,
    };
    this.addSelected = this.addSelected.bind(this);
    this.separateArray = this.separateArray.bind(this);
    this.openDeleteForm = this.openDeleteForm.bind(this);
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    this.setState({
      items: this.props.items[1][0],
    });
    this.separateArray({ data: this.props.items });
  }
  componentDidUpdate(prevProps: any) {
    if (prevProps.items !== this.props.items) {
      this.setState({
        items: this.props.items[1][0],
      });
    }
  }
  addSelected(id: any) {
    this.setState({
      selected: id,
    });
    this.separateArray({ data: this.props.items, selected: id });
    this.filter(id);
  }
  separateArray(value: any) {
    let data;
    let arrayDinamic;
    let i;
    let limit;
    let selected;

    if (value.selected || value.selected === 0) {
      selected = value.selected;
    } else {
      selected = this.state.selected;
    }

    arrayDinamic = [];
    i = 0;
    data = value.data;
    limit = data[0].length;
    for (i; i < limit; i++) {
      if (i !== selected) {
        arrayDinamic.push({ i });
      }
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
          width: "95vw",
          height: "90%",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <div style={{ width: "max-conten" }}>
          <table
            style={{
              height: "fit-content",
              width: "-webkit-fill-available",
            }}
          >
            <thead>
              <tr>
                {/*th*/}
                {this.state.selected || this.state.selected === 0 ? (
                  <th
                    className="th thSelected"
                    onClick={() => this.filter(this.state.selected)}
                  >
                    {this.props.items[0][this.state.selected]}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {/*td*/}
              {this.state.items
                ? this.state.items.map((item: any) => {
                    return (
                      <tr key={item.id}>
                        <td className="td">{item[this.state.selected]}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <div style={{ overflowX: "auto", width: "max-conten" }}>
          <table
            style={{ height: "-webkit-fill-available", width: "max-content" }}
          >
            <thead>
              <tr>
                {this.state.arrayDinamic
                  ? this.state.arrayDinamic.map((item: any) => {
                      return (
                        <th
                          key={item.i}
                          className="th"
                          onClick={() => this.addSelected(item.i)}
                        >
                          {this.props.items[0][item.i]}
                        </th>
                      );
                    })
                  : null}
                {this.props.delete ? <th className="th">Eliminar</th> : null}
              </tr>
            </thead>
            <tbody>
              {/*td*/}
              {this.state.items
                ? this.state.items.map((item1: any) => {
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
                          <td
                            className="td eliminar"
                            onClick={() => {
                              this.openDeleteForm(item1[0]);
                            }}
                          >
                            <ElimininarIco className="eliminar-ico" />
                          </td>
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
                  className="confirmar"
                  onClick={() => {
                    this.openDeleteForm();
                    this.props.deleteFunction(this.state.idSelected);
                  }}
                >
                  Si
                </div>
                <div className="cancelar" onClick={this.openDeleteForm}>
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
