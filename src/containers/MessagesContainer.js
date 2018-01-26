import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MessagesList } from "../components/messages/MessagesList";
import { editMessage, removeMessage } from "../actions/messages";
import SideMenu from "./SideMenu";
import { List } from "semantic-ui-react";
import MessagesForm from "../components/messages/MessagesForm";
import MessageDetails from "../components/messages/MessageDetails";

class MessagesContainer extends Component {
  state = { search: "" };

  filter = list => {
    // debugger;
    return list.filter(el => {
      return el.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  displayComponent = () => {
    const match = this.props.match.path;
    const Id = this.props.match.params.id;
    switch (true) {
      case match === "/messages": {
        return <MessagesForm />;
      }
      case match === "/messages/new": {
        return <MessagesForm />;
      }
      case match === "/messages/edit/:id": {
        // debugger;
        return (
          <MessagesForm
            selected={this.props.messages.find(message => {
              return message.id === parseInt(Id);
            })}
          />
        );
      }
      default:
        return <MessageDetails />;
    }
  };
  render() {
    // console.log("container", this.props);
    const Uniqid = require("uniqid");
    const match = this.props.match.path;
    let messagesList = this.filter(this.props.messages).map(messages => {
      return (
        <List verticalAlign="top" key={`mL-${messages.id}-${Uniqid()}`}>
          <MessagesList
            id={messages.id}
            name={messages.name}
            message={messages.message}
            type={messages.message_type}
            read={messages.read}
            editMessage={this.props.editMessage}
            removeMessage={this.props.removeMessage}
          />
        </List>
      );
    });
    // debugger;
    return (
      <div className="ui three column grid">
        <SideMenu
          List={messagesList}
          className="ui grid container left floated"
          query={this.state.search}
          handleChange={this.handleChange}
        />
        <div className="ui ten wide column ">
          <div>{this.displayComponent()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  // debugger;
  return { messages: store.messages };
};
export default withRouter(
  connect(mapStateToProps, { editMessage, removeMessage })(MessagesContainer)
);
