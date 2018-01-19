import React, { Component } from "react";
// import { Divider } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CampaignsList } from "../components/CampaignsList";
import SideMenu from "./SideMenu";

class CampaignsContainer extends Component {
  render() {
    // console.log("container", this.props);
    const match = this.props.match.path;
    const campaignsList = this.props.campaigns.map(campaign => {
      return (
        <CampaignsList
          key={campaign.id}
          id={campaign.id}
          name={campaign.name}
        />
      );
    });
    return (
      <div className="ui three column grid">
        <SideMenu
          List={campaignsList}
          className="ui grid container left floated"
        />
        <div className="ten wide column ">
          <div>
            {match === "/campaigns"
              ? "Campaign Generic Page"
              : "Campaign Detail Page"}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log("container", state);
  return { campaigns: state.campaigns };
};
export default withRouter(connect(mapStateToProps, null)(CampaignsContainer));
