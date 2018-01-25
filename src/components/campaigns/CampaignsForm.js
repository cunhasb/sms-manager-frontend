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
    newCampaign: { customers: [], interests: [], name: "", message: "" },
    campaignQuery: "",
    customerQuery: "",
    selectedQuery: ""
  };
  // componentWillReceiveProps = () => {
  //   this.setState({ customer: this.props.selected });
  // };
  componentDidMount = () => {
    // debugger;
    if (!this.props.savedSate) {
      const customerComponents = this.props.customers.map(customer => {
        return (
          <CustomersList
            key={`cl${customer.id} - ${Uniqid}`}
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

      this.setState({
        customers: customerComponents,
        newCampaign: { customers: [], interests: [], name: "", message: "" },
        campaignQuery: "",
        customerQuery: "",
        selectedQuery: ""
      });
      this.props.saveCampaignState(this.state);
    } else {
      this.setState(this.props.savedState);
    }
  };
  componentWillUnmount = () => {
    this.props.saveCampaignState(this.state);
  };
  filter = (list, name) => {
    // debugger;
    return list.filter(el => {
      let hasNumber = this.state[name].replace(/[^0-9]/g, "") > 0;
      return hasNumber
        ? el.props.customer.name.toLowerCase().includes(this.state[name]) ||
            el.props.customer.phone
              .replace(/[^0-9]/g, "")
              .includes(this.state[name].replace(/[^0-9]/g, ""))
        : el.props.customer.name.toLowerCase().includes(this.state[name]);
    });
  };

  // handleSelectAll = (e, name) => {
  //   debugger;
  //
  //   let selectedList;
  //   if (name === "customerCheckbox") {
  //     selected = this.state.customers.map(component => {
  //       component.props.customer.selected = true;
  //       return component;
  //     });
  //
  //     this.setState(previous => {
  //       const customerList = previous.customers.filter;
  //       return {
  //         customers: [],
  //         newCampaign: {
  //           customers: [...previousnewCampaign.customers, newList]
  //         }
  //       };
  //     });
  //   } else if (name === "selectedCheckbox") {
  //     newList = this.state.newCampaign.customers.map(component => {
  //       component.props.customer.selected = false;
  //       return component;
  //     });
  //   }
  //   this.setState({ customers: [], newCampaign: { customers: newList } });
  // };
  handleFilter = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    this.props.saveCampaignState(this.state);
  };
  handleChange = (e, { value, name }) => {
    // debugger;
    console.log("value", value, "name", name);
    // debugger;
    let x = this.state;
    // debugger;
    if (name === "customerQuery" || name === "selectedQuery") {
      this.setState({ [name]: value });
    } else {
      // debugger;

      this.setState(previous => {
        let result = previous.newCampaign;
        result[name] = value;
        return {
          customers: previous.customers,
          newCampaign: result,
          campaignQuery: previous.campaignQuery,
          customerQuery: previous.customerQuery,
          selectedQuery: previous.selectedQuery
        };
      });
    }
    this.props.saveCampaignState(this.state);
  };

  handleClick = e => {
    debugger;
  };
  handleSubmit = e => {
    e.preventDefault();
    let state = this.state.newCampaign;
    let customers = state.customers.map(customer => {
      return customer.props.customer.id;
    });
    state[customers] = customers;
    let campaign = {
      customers: customers,
      interests: this.state.newCampaign.interests,
      name: this.state.newCampaign.name,
      message: this.state.newCampaign.message
    };

    // debugger;
    this.props.addCampaign(campaign);
  };
  handleAddCustomer = (e, id, selected) => {
    const index = this.state.customers.findIndex(
      component => component.props.customer.id === id
    );
    let component = this.state.customers[index];
    // debugger;
    component.props.customer.selected = true;
    this.setState(previous => {
      let customers = [
        ...previous.customers.slice(0, index),
        ...previous.customers.slice(index + 1)
      ];
      let newCampaignCustomers = [...previous.newCampaign.customers, component];
      let newCampaign = previous.newCampaign;
      // debugger;
      newCampaign.customers = newCampaignCustomers;
      return {
        customers: customers,
        newCampaign: newCampaign,
        campaignQuery: previous.campaignQuery,
        customerQuery: previous.customerQuery,
        selectedQuery: previous.selectedQuery
      };
    });

    this.props.saveCampaignState(this.state);
  };
  handleRemoveCustomer = (e, id, selected) => {
    const index = this.state.newCampaign.customers.findIndex(
      component => component.props.customer.id === id
    );
    let component = this.state.newCampaign.customers[index];
    component.props.customer.selected = false;
    this.setState(previous => {
      let customers = [...previous.customers, component];
      let newCampaignCustomers = [
        ...previous.newCampaign.customers.slice(0, index),
        ...previous.newCampaign.customers.slice(index + 1)
      ];
      let newCampaign = previous.newCampaign;
      // debugger;
      newCampaign.customers = newCampaignCustomers;
      return {
        customers: customers,
        newCampaign: newCampaign,
        campaignQuery: previous.campaignQuery,
        customerQuery: previous.customerQuery,
        selectedQuery: previous.selectedQuery
      };
    });
    this.props.saveCampaignState(this.state);
  };
  handleDropDown = (e, { value, name }) => {
    debugger;
  };
  render = () => {
    // const Uniqid = require("uniqid");
    // this.populateLists();
    console.log("campaign form props", this.props);
    console.log("Campaign form state", this.state);
    const { customers, campaings } = this.props;
    // debugger;
    let customersList = (
      <List divided verticalAlign="top">
        {this.filter(this.state.customers, "customerQuery")}
      </List>
    );
    let customersAddedList = (
      <List divided verticalAlign="top">
        {this.filter(this.state.newCampaign.customers, "selectedQuery")}
      </List>
    );
    return (
      <Grid columns="equal">
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Form>
                <Form.Group>
                  <Form.Input
                    width={8}
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                  />
                  <Dropdown
                    name="interests"
                    value={this.state.newCampaign.interests}
                    placeholder="Interests"
                    fluid
                    multiple
                    selection
                    onChange={this.handleChange}
                    options={DropDownData}
                  />
                </Form.Group>
                <Form.Group>
                  <TextArea
                    onChange={this.handleChange}
                    name="message"
                    autoHeight
                    placeholder="Message"
                    value={this.state.newCampaign.message}
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
                    <input
                      className="ui"
                      type="text"
                      name="customerQuery"
                      placeholder="Customer"
                      onChange={this.handleFilter}
                      value={this.state.customerQuery}
                    />
                    <Icon name="search" />
                  </div>
                </div>
                {
                  // <div className="ui horizontally fitted item">
                  // <Form>
                  //   <Form.Group>
                  //     <Form.Input
                  //       name="customerQuery"
                  //       placeholder="Customer"
                  //       onChange={this.handleChange}
                  //       value={this.state.query}
                  //       width={12}
                  //     />
                  //     <Icon corner name="search" />
                  //
                  //   <Label>
                  //   <Form.Checkbox
                  //     name="customerCheckbox"
                  //     onChange={e =>
                  //       this.handleChange(e, "customerCheckbox")
                  //     }
                  //     label="All"
                  //   />
                  // </Label>
                  //
                  //   </Form.Group>
                  // </Form>
                  // </div>
                }
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
                      name="selectedQuery"
                      placeholder="Selected"
                      onChange={this.handleFilter}
                      value={this.state.selectedQuery}
                    />
                    <Icon name="search" />
                  </div>
                </div>
                {
                  //   <div className="ui horizontally fitted item">
                  //   <Form>
                  //     <Form.Group>
                  //       <Form.Input
                  //         name="selectedQuery"
                  //         placeholder="Selected"
                  //         onChange={this.handleChange}
                  //         value={this.state.query}
                  //         width={12}
                  //       />
                  //       <Icon corner name="search" />
                  //       {
                  //         // <Label>
                  //         // <Form.Checkbox
                  //         //   name="selectedCheckbox"
                  //         //   label="All"
                  //         //   onClick={this.handleClick}
                  //         // />
                  //         // </Label>
                  //       }
                  //     </Form.Group>
                  //   </Form>
                  // </div>
                }
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
            <Button onClick={this.handleSubmit} floated="left">
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
    customers: store.customers,
    savedState: store.campaigns.campaignState
  };
};
export default withRouter(
  connect(mapStateToProps, {
    addCampaign,
    removeCampaign,
    saveCampaignState
  })(CampaignsForm)
);
