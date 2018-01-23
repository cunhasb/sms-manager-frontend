import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MessagesList } from "../components/messages/MessagesList";
import SideMenu from "./SideMenu";
import { List } from "semantic-ui-react";

class MessagesContainer extends Component {
  render() {
    // console.log("container", this.props);
    const match = this.props.match.path;
    let messagesList = this.props.messages.map(messages => {
      return (
        <List verticalAlign="top" key={messages.id}>
          <MessagesList
            key={messages.id}
            id={messages.id}
            name={messages.name}
            message={messages.message}
            type={messages.type}
            read={messages.read}
            image_url={messages.image_url}
            unread_messages={messages.unread_messages}
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
        />
        <div className="ui ten wide column ">
          <div>
            {match === "/messages"
              ? "Message Generic Page"
              : "Message Detail Page"}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return { messages: store.messages };
};
export default withRouter(connect(mapStateToProps, null)(MessagesContainer));
