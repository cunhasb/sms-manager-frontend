import React from "react";
import { connect } from "react-redux";
import { addCampaign, removeCampaign } from "../actions/campaigns";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";

class CampaignsList extends React.Component {
  componentDidMount = () => {
    fetch(`${API_ROOT}/campaigns/`);
  };
  hanldeReceivedCampaigns = response => {
    debugger;
  };
  render = () => {
    return (
      <div>
        <ActionCable
          channel={{ channel: "UsersChannel" }}
          onReceived={this.handleReceivedCampaigns}
        />
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    quotes: state.quotes
  };
};
export default connect(mapStateToProps, {
  removeCampaign,
  adCampaign
})(CampaignsList);
