import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as IcoChat } from "../../../img/motion_icon-chat.svg";
import "./Chat.scss";

interface MyProps {}

interface MyState {
  online: boolean
}

class Chat extends Component <MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      online: false,
    };
    this.handleChat = this.handleChat.bind(this);
  }

  handleChat() {
    this.setState({
      online: !this.state.online,
    });
  }

  render() {
    return (
      <div className="Chat">
        <div className="Chat-icoMenu" onClick={this.handleChat}>
          <IcoChat />
        </div>
        {this.state.online ? (
          <>
            <div className="Chat-input-content">
              <input
                className="Chat-input"
                type="text"
                placeholder="Escribe algo..."
              />
            </div>
            <div className="Chat-output"></div>
          </>
        ) : null}
      </div>
    );
  }
}

export default connect()(Chat);
