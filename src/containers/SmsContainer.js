import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleSignIn } from "../actions/users";
import Home from "../components/Home";
import CampaignsContainer from "../containers/CampaignsContainer";
import CustomersContainer from "../containers/CustomersContainer";
import NewCampaignForm from "../components/NewCampaignForm";
import Messages from "../components/Messages";
import Container from "../components/Container";

class SmsContainer extends React.Component {
  state = {
    campaigns: [],
    activeCampaign: null
  };
  componentDidMount = () => {};
  handleClick = id => {
    console.log("handleclick", id);
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
    console.log("props - smscontainer", this.props);
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
                  <NewCampaignForm />
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
                    <Container />
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
              path="/replies"
              render={() =>
                this.props.loggedIn ? (
                  <div className="campaignsList">
                    {
                      //   <ActionCable
                      //   channel={{ channel: "CampaignsChannel" }}
                      //   onReceived={this.handleReceivedCampaign}
                      // />
                      // {this.state.campaigns.length ? (
                      //   <Cable
                      //     campaigns={this.state.campaigns}
                      //     handleReceivedMessage={this.handleReceivedMessage}
                      //   />
                      // ) : null}
                      // <h2>Campaigns</h2>
                      // <ul>{mapCampaigns(campaign, this.handleClick)}</ul>
                      // <NewCampaignForm />
                      // {activeCampaign ? (
                      //   <Messages
                      //     campaign={findActiveCampaign(campaign, activeCampaign)}
                      //   />
                      // ) : null
                    }
                    }{" "}
                  </div>
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
    customers: state.customers.customers
  };
};

export default withRouter(
  connect(mapStateToProps, { handleSignIn })(SmsContainer)
);

//helpers

const findActiveCampaign = (campaigns, activeCampaign) => {
  return campaigns.find(campaign => campaign.id === activeCampaign);
};

const mapCampaigns = (campaigns, handleClick) => {
  return campaigns.map(campaign => {
    return (
      <li key={campaign.id} onClick={() => handleClick(campaign.id)}>
        {campaign.name}
      </li>
    );
  });
};
