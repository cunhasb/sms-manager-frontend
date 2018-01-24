import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Image, List, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { removeCustomer, editCustomer } from "../../actions/customers";

class CustomersList extends Component {
  render() {
    const Uniqid = require("uniqid");
    const { removeCustomer } = this.props;
    // console.log("list", this.props);
    return (
      <Link key={Uniqid} to={`/customers/${this.props.id}`}>
        <List.Item size="huge">
          <List.Content>
            <Image circular avatar src={this.props.image_url} />
            {this.props.name}
            <Button
              onClick={() => removeCustomer(this.props.id)}
              size="mini"
              circular
              floated="right"
              icon="remove"
            />
            <Link
              customer={this.props.customer}
              key={Uniqid}
              to={`/customers/edit/${this.props.id}`}
            >
              <Button
                onClick={() => editCustomer(this.props.id)}
                size="mini"
                circular
                floated="right"
                icon="edit"
              />
            </Link>
          </List.Content>
        </List.Item>
      </Link>
    );
  }
}

export default connect(null, { removeCustomer, editCustomer })(CustomersList);
