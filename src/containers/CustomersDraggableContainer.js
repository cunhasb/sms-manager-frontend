import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Container from "../components/Container";
import SideMenu from "./SideMenu";
import { CustomersList } from "../components/CustomersList";

class CustomersDraggableContainer extends Component {
  render() {
    // console.log("container", this.props);
    const match = this.props.match.path;
    var customersList = [];
    customersList = this.props.customers.map(customer => {
      return <Container />;
    });
    return (
      <div className="ui three column grid">
        <SideMenu
          List={customersList}
          className="ui grid container left floated"
        />
        <div className="ten wide column ">
          <div>
            {match === "/customers/draggable" ? (
              <Container />
            ) : (
              "Campaign Detail Page"
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { customers: state.customers.customers };
};
export default withRouter(
  connect(mapStateToProps, null)(CustomersDraggableContainer)
);
