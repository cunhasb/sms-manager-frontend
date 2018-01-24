import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addCampaign,
  removeCampaign,
  saveCampaignState,
  getCampaignState
} from "../../actions/campaigns";
import CustomersList from "../../components/campaigns/CustomersListCampaigns";
import DropDownData from "../../components/campaigns/DropDownData";
import {
  Form,
  Button,
  Icon,
  Container,
  Grid,
  Image,
  Segment,
  List,
  Checkbox,
  Dropdown,
  Label,
  TextArea
} from "semantic-ui-react";

const Uniqid = require("uniqid");
class CampaignsForm extends React.Component {
  state = {
    customers: [],
    newCampaign: { customers: [] }
  };
  // componentWillReceiveProps = () => {
  //   this.setState({ customer: this.props.selected });
  // };
  componentDidMount = () => {
    const customerComponents = this.props.customers.map(customer => {
      return (
        <CustomersList
          key={Uniqid}
          customer={customer}
          id={customer.id}
          name={customer.name}
          phone={customer.phone}
          image_url={customer.image_url}
          unreadMessages={customer.unread_messages}
          addCustomer={this.handleAddCustomer}
          removeCustomer={this.handleRemoveCustomer}
        />
      );
    });

    let customerList = customerComponents.filter(
      component => !component.props.customer.select
    );
    let selectedList = customerComponents.filter(
      component => component.props.customer.select
    );
    this.setState({
      customers: customerList,
      newCampaign: { customers: selectedList }
    });
    this.props.saveCampaignState(this.state);
  };
  componentDidUpdate = () => {
    // debugger;
  };
  handleChange = e => {
    this.setState({ newCampaign: { [e.target.name]: e.target.value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("hit submit", this.state.name);
    this.props.addCampaigns(this.state);
  };
  handleAddCustomer = (id, selected) => {
    const index = this.state.customers.findIndex(
      component => component.props.customer.id === id
    );
    let x = this.state;
    let component = this.state.customers[index];
    // debugger;
    component.props.customer.selected = true;
    this.setState(previous => {
      return {
        customers: [
          ...previous.customers.slice(0, index),
          ...previous.customers.slice(index + 1)
        ],
        newCampaign: {
          customers: [...this.state.newCampaign.customers, component]
        }
      };
    });
    // dispatch(this.props.saveCampaignState(this.state))
  };
  handleRemoveCustomer = (id, selected) => {
    const index = this.state.newCampaign.customers.findIndex(
      component => component.props.customer.id === id
    );
    let x = this.state;
    let component = this.state.newCampaign.customers[index];
    // debugger;
    component.props.customer.selected = false;
    this.setState(previous => {
      return {
        customers: [...previous.customers, component],
        newCampaign: {
          customers: [
            ...previous.newCampaign.customers.slice(0, index),
            ...previous.newCampaign.customers.slice(index + 1)
          ]
        }
      };
    });
  };
  handleSelect = e => {};
  render = () => {
    const Uniqid = require("uniqid");
    console.log("campaign form props", this.props);
    console.log("Campaign form state", this.state);
    const { customers, campaings } = this.props;
    // debugger;
    let customersList = (
      <List divided verticalAlign="top">
        {this.state.customers}
      </List>
    );
    let customersAddedList = (
      <List divided verticalAlign="top">
        {this.state.newCampaign.customers}
      </List>
    );
    return (
      <Grid columns="equal">
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Input
                    width={8}
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                  />
                  <Dropdown
                    placeholder="Interests"
                    fluid
                    multiple
                    selection
                    options={DropDownData}
                  />
                </Form.Group>
                <Form.Group>
                  <TextArea
                    autoHeight
                    placeholder="Try adding multiple lines"
                  />
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <div
                className="ui massive vertical menu style"
                style={{ width: "100%" }}
              >
                <div className="ui horizontally fitted item">
                  <div className="ui icon input ">
                    <Form.Group>
                      <Form.Input
                        name="customer-query"
                        width={8}
                        placeholder="Name"
                        onChange={this.handleChange}
                        placeholder="Customer"
                        onChange={this.handleChange}
                        value={this.state.query}
                      />
                      <div className="ui icon input ">
                        <Checkbox label="All" />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="active item">
                  <div className=" bottom attached segment pushable">
                    <div
                      className="ui secondary vertical pointing menu pusher"
                      style={{
                        overflowY: "auto",
                        whiteSpace: "nowrap",
                        height: "350px",
                        width: "100%",
                        textAlign: "left"
                      }}
                    >
                      {customersList}
                    </div>
                  </div>
                </div>
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <div
                className="ui massive vertical menu "
                style={{ width: "100%" }}
              >
                <div className="ui horizontally fitted item">
                  <div className="ui icon input ">
                    <input
                      className="ui"
                      type="text"
                      name="query"
                      placeholder="Customer"
                      onChange={this.handleChange}
                      value={this.state.query}
                    />
                    <div className="ui icon input ">
                      <Checkbox label="All" />
                    </div>
                  </div>
                </div>
                <div className="active item">
                  <div className=" bottom attached segment pushable">
                    <div
                      className="ui secondary vertical pointing menu pusher"
                      style={{
                        overflowY: "auto",
                        whiteSpace: "nowrap",
                        height: "300px",
                        width: "100%",
                        textAlign: "left"
                      }}
                    >
                      {customersAddedList}
                    </div>
                  </div>
                </div>
              </div>
            </Segment>
            <Button type="submit" floated="left">
              Submit Campaign
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
}

const mapStateToProps = store => {
  return {
    campaigns: store.campaigns,
    customers: store.customers
  };
};
export default withRouter(
  connect(mapStateToProps, {
    addCampaign,
    removeCampaign,
    saveCampaignState
  })(CampaignsForm)
);
