import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CampaignsList from "../components/campaigns/CampaignsList";
import CampaignsForm from "../components/campaigns/CampaignsForm";
import CampaignDetails from "../components/campaigns/CampaignsDetails";
import { removeCampaign } from "../actions/campaigns";
import SideMenu from "./SideMenu";
import { List } from "semantic-ui-react";

class CampaignsContainer extends Component {
  displayComponent = () => {
    const match = this.props.match.path;
    const Id = this.props.match.params.id;
    switch (true) {
      case match === "/campaigns": {
        return <CampaignsForm />;
      }
      case match === "/campaigns/new": {
        return <CampaignsForm />;
      }
      case match === "/campaigns/edit/:id": {
        // debugger;
        return (
          <CampaignsForm
            selected={this.props.campaigns.find(campaign => {
              return campaign.id === parseInt(Id);
            })}
          />
        );
      }
      default:
        return <CampaignDetails />;
    }
  };

  render() {
    const Uniqid = require("uniqid");
    console.log("container", this.props);
    const match = this.props.match.path;
    let campaignsList = this.props.campaigns.map(campaign => {
      return (
        <List verticalAlign="top">
          <CampaignsList
            key={Uniqid}
            campaign={campaign}
            id={campaign.id}
            name={campaign.name}
            unreadMessages={campaign.unread_messages}
          />
        </List>
      );
    });
    // debugger;
    return (
      <div className="ui three column grid">
        <SideMenu
          key={Uniqid}
          List={campaignsList}
          className="ui grid container left floated"
        />
        <div className="ui ten wide column ">
          <div>{this.displayComponent()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return { campaigns: store.campaigns };
};
export default withRouter(
  connect(mapStateToProps, { removeCampaign })(CampaignsContainer)
);
