import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CustomersList } from "../components/CustomersList";
import SideMenu from "./SideMenu";
import { List } from "semantic-ui-react";

class CustomersContainer extends Component {
  render() {
    // console.log("container", this.props);
    const match = this.props.match.path;
    let customersList = this.props.customers.map(customer => {
      return (
        <List vertical relaxed="very">
          <CustomersList
            key={customer.id}
            id={customer.id}
            name={customer.name}
            image_url={customer.image_url}
            unread_messages={customer.unread_messages}
          />
        </List>
      );
    });
    // debugger;
    return (
      <div className="ui three column grid">
        <SideMenu
          List={customersList}
          className="ui grid container left floated"
        />
        <div className="ten wide column ">
          <div>
            {match === "/customers"
              ? "Campaign Generic Page"
              : "Campaign Detail Page"}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return { customers: store.customers.customers };
};
export default withRouter(connect(mapStateToProps, null)(CustomersContainer));
