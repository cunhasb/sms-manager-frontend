import React, { Component } from "react";
import {
  Header,
  Icon,
  Menu,
  Container,
  Segment,
  Label,
  Comment,
  Dimmer,
  Loader,
  Image
} from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { CustomerDetailMessages } from "./CustomerDetailMessages";
import { saveSelectedCustomer } from "../../actions/customers";

class CustomerDetails extends Component {
  state = {
    activeItem: "add",
    selectedCustomer: {
      id: "",
      name: "",
      email: "",
      phone: "",
      carrier: ""
    },
    messages: []
  };

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name,
      messages: this.props.messages,
      active: !this.props.messages.length > 0
    });
  };
  componentDidMount = () => {
    this.setState({
      selectedCustomer: this.props.selectedCustomer,
      messages: this.props.messages,
      active: !this.props.messages.length > 0
    });
  };
  componentWillReceiveProps = nextProps => {
    this.setState({
      selectedCustomer: nextProps.selectedCustomer,
      messages: nextProps.messages,
      active: !nextProps.messages.length > 0
    });
    saveSelectedCustomer({ selectedCustomer: nextProps.selectedCustomer });
  };

  render() {
    const { activeItem } = this.state;
    console.log("customer state", this.state);
    const {
      id,
      name,
      email,
      phone,
      carrier,
      image_url
    } = this.state.selectedCustomer;
    const messagesComponents = this.state.messages.map(message => {
      // debugger;
      console.log("generating components", message);
      if (message.message_type === "from_user") {
        console.log("from_user", message);
        return (
          <Container textAlign="right">
            <Comment>
              <Comment.Avatar
                as="a"
                src={image_url}
                style={{ float: "right" }}
              />
              <Comment.Content>
                <Comment.Author as="a">{name}</Comment.Author>
                <Comment.Text>{message.name}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Container>
        );
      } else {
        console.log("to_user", message);
        return (
          <Container textAlign="left">
            <Comment textAlign="left">
              <Comment.Avatar as="a" src={this.props.authUser.image_url} />
              <Comment.Content>
                <Comment.Author as="a">
                  {this.props.authUser.name}
                </Comment.Author>
                <Comment.Text>{message.name}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Container>
        );
      }
    });
    return (
      <Container fluid text textAlign="center">
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

        <Segment>
          <Header as="h2" icon>
            <Image src={image_url} size="huge" />
            <Header.Subheader>
              <Header size="Huge">{name}</Header>
              <Header size="medium">{email}</Header>
              <Header size="medium">{phone}</Header>
              <Header size="small">{carrier}</Header>
            </Header.Subheader>
          </Header>
        </Segment>

        <Comment.Group threaded fluid>
          <Header as="h3" dividing>
            Comments
          </Header>
          {messagesComponents}
          <Loader active={this.state.active} />
        </Comment.Group>
        <Segment />
      </Container>
    );
  }
}
const mapStateToProps = store => {
  // debugger;
  console.log(
    "selected customer inside customerdetails map",
    store.customers.selectedCustomer
  );
  let customers = store.customers;
  let messagesList = store.messages.filter(message => {
    return message.customer.id === store.customers.selectedCustomer.id;
  });
  return {
    messages: messagesList,
    customers: customers,
    authUser: store.users.authUser
  };
};
export default withRouter(
  connect(mapStateToProps, { saveSelectedCustomer })(CustomerDetails)
);
