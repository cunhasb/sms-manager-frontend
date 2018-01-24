import React, { Fragment } from "react";
import { ActionCable } from "react-actioncable-provider";
import { connect } from "react-redux";
import { handleOnReceived as usersHandleOnReceived } from "../actions/users";
import { handleOnReceived as campaignsHandleOnReceived } from "../actions/campaigns";
import { handleOnReceived as customersHandleOnReceived } from "../actions/customers";
import { handleOnReceived as messagesHandleOnReceived } from "../actions/messages";

const Cable = props => {
  // console.log("cable", props);
  const handleOnReceive = response => {
    debugger;
    props.campaignsHandleOnReceived(response);
  };
  if (props.loggedIn) {
    return (
      <Fragment>
        <ActionCable
          channel={{
            channel: "CampaignsChannel",
            id: props.authUser.id
          }}
          onReceived={() => {
            props.messagesHandleOnReceived;
          }}
        />
        <ActionCable
          channel={{
            channel: "MessagesChannel",
            id: props.loggedIn ? props.authUser.id : null
          }}
          onReceived={() => {
            props.messagesHandleOnReceived;
          }}
        />
        <ActionCable
          channel={{
            channel: "CustomersChannel",
            id: props.loggedIn ? props.authUser.id : null
          }}
          OnReceived={() => {
            props.customersHandleOnReceived;
          }}
        />
      </Fragment>
    );
  }
  return null;
};
const mapStateToProps = store => {
  return {
    authUser: store.users.authUser,
    loggedIn: !!store.users.authUser
  };
};
export default connect(mapStateToProps, {
  usersHandleOnReceived,
  customersHandleOnReceived,
  campaignsHandleOnReceived,
  messagesHandleOnReceived
})(Cable);
