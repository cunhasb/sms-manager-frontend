import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleSignIn } from "../actions/users";
import Home from "../components/Home";
import CampaignsContainer from "../containers/CampaignsContainer";
import CustomersContainer from "../containers/CustomersContainer";
import CampaignForm from "../components/campaigns/CampaignForm";
import CustomersForm from "../components/customers/CustomersForm";
import MessagesContainer from "../containers/MessagesContainer";
// import CustomersDraggableContainer from "../containers/CustomersDraggableContainer";
// import Container from "../components/Container";

class SmsContainer extends React.Component {
  state = {
    campaigns: [],
    activeCampaign: null
  };
  componentDidMount = () => {};
  handleClick = id => {
    // console.log("handleclick", id);
    this.setState({ activeCampaign: id });
  };
  handleReceivedCampaign = response => {
    const { campaign } = response;
    this.setState({
      campaign: [...this.state.campaign, campaign]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const campaigns = [...this.state.campaign];
    const campaign = campaign.find(
      campaign => campaign.id === message.campaign_id
    );
    campaign.messages = [...campaign.messages, message];
    this.setState({ campaign });
  };

  render() {
    // console.log("props - smscontainer", this.props);
    // console.log("this state", this.state);
    const loggedIn = this.props.loggedIn;
    const { campaign, activeCampaign } = this.state;
    return (
      <div className="ui three column grid">
        <div className="sixteen wide column ">
          <Switch>
            <Route
              exact
              path="/login"
              render={() => {
                return loggedIn ? <Home /> : <div>Please login first</div>;
              }}
            />
            <Route
              exact
              path="/campaigns/new"
              render={() =>
                this.props.loggedIn ? (
                  <CampaignForm />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/campaigns/:id/"
              render={({ match }) => {
                const campaign = this.props.campaigns.find(el => {
                  // debugger;
                  return el.id === match.params.id;
                });
                campaign ? (
                  this.props.handleClick(campaign.id)
                ) : (
                  <div>Loading</div>
                );
                return (
                  <div>
                    <CampaignsContainer />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/campaigns"
              render={() =>
                this.props.loggedIn ? (
                  <CampaignsContainer />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/customers/new"
              render={() =>
                this.props.loggedIn ? (
                  <CustomersContainer />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/customers/edit/:id"
              render={() =>
                this.props.loggedIn ? (
                  <CustomersContainer />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/customers/:id"
              render={() =>
                this.props.loggedIn ? (
                  <CustomersContainer />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/customers"
              render={() =>
                this.props.loggedIn ? (
                  <CustomersContainer />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/Messages"
              render={() =>
                this.props.loggedIn ? (
                  <MessagesContainer />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/"
              render={() => (loggedIn ? <Home /> : <Redirect to="/login" />)}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // debugger;
  return {
    loggedIn: !!state.users.authUser,
    campaigns: state.campaigns,
    customers: state.customers.customers,
    messages: state.message
  };
};

export default withRouter(
  connect(mapStateToProps, { handleSignIn })(SmsContainer)
);
