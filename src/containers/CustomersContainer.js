import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CustomersList } from "../components/CustomersList";
import SideMenu from "./SideMenu";

class CustomersContainer extends Component {
  render() {
    // console.log("container", this.props);
    const match = this.props.match.path;
    var customersList = [];
    customersList = this.props.customers.map(customer => {
      return (
        <CustomersList
          key={customer.id}
          id={customer.id}
          name={customer.name}
        />
      );
    });
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
const mapStateToProps = state => {
  return { customers: state.customers.customers };
};
export default withRouter(connect(mapStateToProps, null)(CustomersContainer));
