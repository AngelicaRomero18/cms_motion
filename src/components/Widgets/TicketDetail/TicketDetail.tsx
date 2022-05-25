import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "../../../Models/Message";
import {
  getMessageTicket,
  SendMessage,
} from "../../../redux/actions/tickets.action";
import "./TicketDetail.scss";
import { ReactComponent as IcoSend } from "../../../img/motion_icon-flecha-derecha.svg";

const mapStateToProps = (state: any) => {
  return {
    TicketsReducer: state.TicketsReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  SendMessage: (message: any) => {
    dispatch(SendMessage(message));
  },
  getMessageTicket: (id: any) => {
    dispatch(getMessageTicket(id));
  },
});

interface MyProps {
  ticket: any;
  getMessageTicket: Function;
  SendMessage: Function;
  TicketsReducer: any;
  exit: any;
}

interface MyState {
  getMessageInterval: any;
  message: Message;
}

class TicketDetail extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    (this.state.message.id = props.ticket.id),
      (this.state.message.body = ""),
      (this.handleChange = this.handleChange.bind(this));
    this.SendMessage = this.SendMessage.bind(this);
  }

  componentDidMount() {
    this.props.getMessageTicket(this.props.ticket.id);
    let getMessageInterval = setInterval(() => {
      this.props.getMessageTicket(this.props.ticket.id);
    }, 1000);
    this.setState({ getMessageInterval: getMessageInterval });
  }

  componentWillUnmount() {
    clearInterval(this.state.getMessageInterval);
  }

  handleChange(event?: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      message: {
        ...this.state.message,
        [name]: value,
      },
    });
  }

  async SendMessage(e?: any) {
    if (e.keyCode && e.keyCode === 13) {
      await this.props.SendMessage(this.state.message);
      this.setState({
        message: {
          ...this.state.message,
          body: "",
        },
      });
      setTimeout(() => {
        this.props.getMessageTicket(this.props.ticket.id);
      }, 500);
    } else if (!e.keyCode) {
      await this.props.SendMessage(this.state.message);
      this.setState({
        message: {
          ...this.state.message,
          body: "",
        },
      });
      setTimeout(() => {
        this.props.getMessageTicket(this.props.ticket.id);
      }, 500);
    }
  }

  render() {
    const { ticket } = this.props;
    const { messages } = this.props.TicketsReducer;
    return (
      <div className="TicketDetail">
        <div className="column frontModal">
          <div className="frontModal-content column">
            <div className="header">
              <div className="title">{ticket.number}</div>
            </div>
            <div className="body row">
              <div className="content-description column">
                <div className="content-asunto column">
                  <div className="asunto">{ticket.ticket_name}</div>
                </div>
                <div className="content-ticketDescription column">
                  <div className="ticketDescription">{ticket.description}</div>
                </div>
                <div className="content-create_date column">
                  <div className="create_date">{ticket.create_date}</div>
                </div>
              </div>
              <div className="content-chat column">
                <div className="content-messages">
                  <div className="margin-messages column">
                    {messages
                      ? messages.map((message?: any) => {
                          if (message.body) {
                            return (
                              <div
                                className={`messages ${
                                  message.own ? "own" : ""
                                } column`}
                              >
                                <div className="box-messages column">
                                  <div
                                    className={`message ${
                                      message.own ? "active" : ""
                                    }`}
                                    dangerouslySetInnerHTML={{
                                      __html: message.body,
                                    }}
                                  ></div>
                                  <div className="info-message row">
                                    <div className="date">
                                      {message.create_date}
                                    </div>
                                    <div className="user">{message.from}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })
                      : null}
                  </div>
                </div>
                <div className="content-send row">
                  <input
                    type="text"
                    className="send"
                    placeholder="Escribir mensaje..."
                    name="body"
                    value={this.state.message.body}
                    onChange={this.handleChange}
                    onKeyDown={this.SendMessage}
                  />
                  <div className="button-send row" onClick={this.SendMessage}>
                    <IcoSend className="ico-send"></IcoSend>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="backModal" onClick={this.props.exit}></div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetail);
