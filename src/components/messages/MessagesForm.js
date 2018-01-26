import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addMessage, editMessage, removeMessage } from "../../actions/messages";
import { Form, Button, Icon } from "semantic-ui-react";

class MessagesForm extends React.Component {
  state = {};
  // componentWillReceiveProps = () => {
  //   this.setState({ customer: this.props.selected });
  // };

  getSelectedMessages = () => {
    let id = this.props.match.params.id;
    // selected = this.props.messages.messages;
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("hit submit", this.state.name);
    this.props.addMessage(this.state);
    this.setState({ name: "", email: "", phone: "", carrier: "" });
  };

  render = () => {
    console.log("form props", this.props);
    console.log("form state", this.state);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            name="name"
            placeholder="Name"
            width={6}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Input
            name="email"
            placeholder="Email"
            width={4}
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            name="phone"
            placeholder="Phone"
            width={3}
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <Form.Select
            search
            name="carrier"
            options={this.props.carriers}
            placeholder="Phone Carrier"
            width={4}
            value={this.state.carrier}
            onChange={this.handleChange}
          />
          <Button type="submit" floated="right">
            <Icon.Group>
              <Icon name="user" />
              <Icon corner name="add" />
            </Icon.Group>
          </Button>
        </Form.Group>
      </Form>
    );
  };
}
const mapStateToProps = store => {
  const carriersList = store.carriers.map(carrier => ({
    key: carrier.id,
    text: carrier.name + " - " + carrier.country,
    value: carrier.id
  }));

  return {
    carriers: carriersList,
    customer: { id: "", name: "", email: "", phone: "", carrier: "" }
  };
};
export default withRouter(
  connect(mapStateToProps, {
    addMessage,
    editMessage,
    removeMessage
  })(MessagesForm)
);
