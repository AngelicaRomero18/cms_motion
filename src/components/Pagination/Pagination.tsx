import { Component } from "react";
import { ReactComponent as Polygon } from "../../../img/Polygon.svg";
import { ReactComponent as PolygonD } from "../../../img/PolygonD.svg";
import "./Pagination.scss";

interface MyProps {
  items?: any;
  filter?: any;
  paginate?: any;
}

interface MyState {
  pages: any;
  pageSize: number;
  pageLimit: number;
  pageCurrent: number;
  items: any;
  paginateView: any;
}

class Pagination extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pages: [],
      pageSize: 5,
      pageLimit: 10,
      pageCurrent: 1,
      items: null,
      paginateView: [],
    };
    this.pageSizeF = this.pageSizeF.bind(this);
    this.tableTools = this.tableTools.bind(this);
    this.paginate = this.paginate.bind(this);
    this.paginateA = this.paginateA.bind(this);
    this.paginateB = this.paginateB.bind(this);
    this.handleChangeLimit = this.handleChangeLimit.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: this.props.items,
    });
    this.tableTools();
  }

  componentDidUpdate(prevProps: any) {
    console.log(this.props.items);
    if (prevProps.items !== this.props.items) {
      this.setState({
        items: this.props.items,
      });
      this.tableTools();
      console.log("si si lo hizo");
    }
  }

  tableTools(value?: any) {
    let items;
    if (value && value.newData) {
      items = value.newData;
    } else if (this.state.items) {
      items = this.state.items;
    } else {
      items = this.props.items;
    }
    let pageLimit;
    if (value && value.pageLimitF) {
      pageLimit = value.pageLimitF;
    } else {
      pageLimit = this.state.pageLimit;
    }
    const pageSize = Math.ceil(items.length / pageLimit);
    this.setState({
      pageSize: pageSize,
      pageCurrent: 1,
    });
    this.pageSizeF(pageSize, pageLimit);
  }

  pageSizeF(pageSize: any, pageLimit: any) {
    var pages = [];
    var i = 0;
    for (i; i < pageSize; i++) {
      pages.push(i + 1);
    }
    this.setState({
      pages: pages,
    });
    let page = this.state.pageCurrent;
    this.paginate({ page: page, pageLimit: pageLimit });
  }

  paginate(value: any) {
    let items;
    if (value && value.newData) {
      items = value.newData;
    } else if (this.state.items) {
      items = this.state.items;
    } else {
      items = this.props.items;
    }
    let page;
    if (value && value.page) {
      page = value.page;
      this.setState({
        pageCurrent: page,
      });
    } else {
      page = this.state.pageCurrent;
    }

    let pLimit;
    if (value && value.pageLimit) {
      pLimit = value.pageLimit;
    } else {
      pLimit = this.state.pageLimit;
    }

    let init;
    let limit;
    let data;
    var paginateView = [];
    let long;

    long = items.length;
    init = page * pLimit - pLimit;
    if (page * pLimit - long > 0) {
      limit = long;
    } else {
      limit = page * pLimit;
    }
    data = items;
    for (init; init < limit; init++) {
      paginateView.push(data[init]);
    }
    this.setState({
      paginateView: paginateView,
    });
    console.log("si lo repitio ?");
    this.props.paginate(paginateView);
  }

  paginateB() {
    let init;
    let limit;
    let data;
    var paginateView = [];
    let long;

    let page = this.state.pageCurrent - 1;

    this.setState({
      pageCurrent: page,
    });

    long = this.props.items.length;
    init = page * this.state.pageLimit - this.state.pageLimit;
    if (page * this.state.pageLimit - long > 0) {
      limit = long;
    } else {
      limit = page * this.state.pageLimit;
    }
    data = this.props.items;
    for (init; init < limit; init++) {
      paginateView.push(data[init]);
    }
    this.setState({
      paginateView: paginateView,
    });
    this.props.paginate(paginateView);
  }

  paginateA() {
    let init;
    let limit;
    let data;
    var paginateView = [];
    let long;

    let page = this.state.pageCurrent + 1;

    this.setState({
      pageCurrent: page,
    });

    long = this.props.items.length;
    init = page * this.state.pageLimit - this.state.pageLimit;
    if (page * this.state.pageLimit - long > 0) {
      limit = long;
    } else {
      limit = page * this.state.pageLimit;
    }
    data = this.props.items;
    for (init; init < limit; init++) {
      paginateView.push(data[init]);
    }
    this.setState({
      paginateView: paginateView,
    });
    this.props.paginate(paginateView);
  }

  handleChangeLimit(event: any) {
    const target = event.target;
    const name = target.name;
    const pageLimitF = parseInt(target.value);
    // @ts-ignore
    this.setState({
      [name]: pageLimitF,
    });
    this.tableTools({ pageLimitF: pageLimitF });
  }

  filter(event: any) {
    var account = event.target.value;
    const data = this.props.items;
    var name = this.props.filter ? this.props.filter : "name";
    const newData = data.filter(function (item: any) {
      const itemData = item[name].toUpperCase();
      const accountData = account.toUpperCase();
      return itemData.indexOf(accountData) > -1;
    });

    this.setState({
      items: newData,
    });

    this.tableTools({ newData: newData });
    this.paginate({ newData: newData });
  }

  render() {
    return (
      <div className="row filter">
        <div className="row">
          <div style={{ alignSelf: "center" }}>Cantidad por página</div>
          <select
            name="pageLimit canP"
            onChange={(event) => this.handleChangeLimit(event)}
          >
            <option value="5">5</option>
            <option value="10" selected>
              10
            </option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="row">
          {this.state.pageCurrent > 1 ? (
            <Polygon
              onClick={this.paginateB}
              className="marginRL"
              style={{ transform: "rotate(180deg)" }}
            />
          ) : (
            <PolygonD
              className="marginRL"
              style={{
                fill: "#c5c5c580",
                transform: "rotate(180deg)",
              }}
            />
          )}

          {this.state.pages
            ? this.state.pages.map((page: any) => {
                return page === this.state.pageCurrent ? (
                  <div
                    className="marginRL"
                    style={{
                      color: "rgba(64, 206, 228, 1)",
                      fontWeight: "bold",
                    }}
                    onClick={() => this.paginate({ page: page })}
                    key={page}
                  >
                    {page}
                  </div>
                ) : (
                  <div
                    className="marginRL"
                    onClick={() => this.paginate({ page: page })}
                    key={page}
                  >
                    {page}
                  </div>
                );
              })
            : null}

          {this.state.pageCurrent !== this.state.pageSize ? (
            <Polygon className="marginRL" onClick={this.paginateA} />
          ) : (
            <PolygonD className="marginRL" style={{ fill: "#c5c5c580" }} />
          )}
        </div>
        <div>
          <input
            className="search"
            type="search"
            placeholder="Buscar"
            onChange={(event) => this.filter(event)}
          />
        </div>
      </div>
    );
  }
}

export default Pagination;
