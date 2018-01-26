import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CustomersList from "../components/customers/CustomersList";
import CustomersForm from "../components/customers/CustomersForm";
import CustomerDetails from "../components/customers/CustomerDetails";
import { removeCustomer, saveSelectedCustomer } from "../actions/customers";
import SideMenu from "./SideMenu";
import { List } from "semantic-ui-react";

class CustomersContainer extends Component {
  state = {
    search: ""
  };

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
        return (
          <CustomerDetails
            selectedCustomer={this.props.customers.selectedCustomer}
          />
        );
    }
  };
  filter = list => {
    let x = list;
    let search = this.state.search;
    // debugger;
    return list.filter(el => {
      return el.name.toLowerCase().includes(this.state.search);
    });
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleClick = (e, { id, name }) => {
    // let x = id;
    // let y = name;
    // let z = e;
    // let props = this.props;
    // debugger;
    let customer = this.props.customers.find(customer => customer.id === id);
    this.setState({ selectedCustomer: customer });
    this.props.saveSelectedCustomer(customer);
    // debugger;
  };

  render() {
    console.log("container state", this.state);
    console.log("container props", this.props);
    const Uniqid = require("uniqid");
    const match = this.props.match.path;
    const customersList = this.filter(this.props.customers).map(customer => {
      console.log("customersList", customersList);
      return (
        <List verticalAlign="top">
          <CustomersList
            key={Uniqid()}
            customer={customer}
            id={customer.id}
            name={customer.name}
            image_url={customer.image_url}
            unreadMessages={customer.unread_messages}
            handleClick={this.handleClick}
            selectedCustomer={this.selectedCustomer}
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
          handleChange={this.handleChange}
          query={this.search}
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
  connect(mapStateToProps, { removeCustomer, saveSelectedCustomer })(
    CustomersContainer
  )
);
