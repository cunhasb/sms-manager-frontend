import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

class CustomerDetails extends Component {
  state = {
    activeItem: "add",
    selectedCustomer: { id: "", name: "", email: "", phone: "", carrier: "" }
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    const { id } = this.props.match.params.id;
    // console.log(this.props.match.params.id);
    return (
      <div className="ui menu">
        <div
          className={
            "menu item " + (this.state.activeItem === "add" ? "active" : "")
          }
        >
          <NavLink
            name="add"
            className=" ui"
            to="/customers/new"
            onClick={this.handleClick}
          >
            <Icon name="add" />
          </NavLink>
        </div>
        <div
          className={
            "menu item " + (this.state.activeItem === "edit" ? "active" : "")
          }
        >
          <NavLink
            className=" ui"
            to={"/customers/edit/" + this.props.match.params.id}
            name="edit"
            onClick={this.handleClick}
          >
            <Icon name="edit" />
          </NavLink>
        </div>
      </div>
    );
  }
}
export default withRouter(CustomerDetails);
