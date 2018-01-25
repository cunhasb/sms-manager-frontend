import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Image, List, Button, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { removeCustomer, editCustomer } from "../../actions/customers";

class CustomersListCampaigns extends Component {
  render() {
    const Uniqid = require("uniqid");
    const { removeCustomer, addCustomer } = this.props;
    const selected = this.props.customer.selected;
    return (
      <List.Item
        key={`clc - ${Uniqid}`}
        size="huge"
        selected={this.props.selected}
      >
        <List.Content>
          <Image circular avatar src={this.props.image_url} />
          {this.props.name}
          {this.props.phone}
          {selected ? (
            <Button
              onClick={e =>
                removeCustomer(e, this.props.id, this.props.selected)
              }
              size="mini"
              circular
              floated="right"
              icon="remove"
            />
          ) : (
            <Button
              onClick={e => addCustomer(e, this.props.id, this.props.selected)}
              size="mini"
              circular
              floated="right"
              icon="add"
            />
          )}
        </List.Content>
      </List.Item>
    );
  }
}

export default connect(null)(CustomersListCampaigns);
