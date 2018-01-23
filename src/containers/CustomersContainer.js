import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CustomersList from "../components/customers/CustomersList";
import CustomersForm from "../components/customers/CustomersForm";
import CustomerDetails from "../components/customers/CustomerDetails";
import { removeCustomer } from "../actions/customers";
import SideMenu from "./SideMenu";
import { List } from "semantic-ui-react";

class CustomersContainer extends Component {
  displayComponent = () => {
    const match = this.props.match.path;
    const Id = this.props.match.params.id;
    switch (true) {
      case match === "/customers": {
        return <CustomersForm />;
      }
      case match === "/customers/new": {
        return <CustomersForm />;
      }
      case match === "/customers/edit/:id": {
        // debugger;
        return (
          <CustomersForm
            selected={this.props.customers.find(customer => {
              return customer.id === parseInt(Id);
            })}
          />
        );
      }
      default:
        return <CustomerDetails />;
    }
  };

  render() {
    // console.log("container", this.props);
    const match = this.props.match.path;
    let customersList = this.props.customers.map(customer => {
      return (
        <List verticalAlign="top">
          <CustomersList
            key={customer.id}
            customer={customer}
            id={customer.id}
            name={customer.name}
            image_url={customer.image_url}
            unreadMessages={customer.unread_messages}
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
        <div className="ui ten wide column ">
          <div>{this.displayComponent()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return { customers: store.customers };
};
export default withRouter(
  connect(mapStateToProps, { removeCustomer })(CustomersContainer)
);
