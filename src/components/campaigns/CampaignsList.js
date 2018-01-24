import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Image, List, Button, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { removeCampaign, editCampaign } from "../../actions/campaigns";

class CampaignsList extends Component {
  render() {
    const Uniqid = require("uniqid");
    const { removeCampaign } = this.props;
    // console.log("list", this.props);
    return (
      <Link key={Uniqid} to={`/campaigns/${this.props.id}`}>
        <List.Item size="huge">
          <List.Content>
            {this.props.name}
            <Label circular>{this.props.unreadMessages}</Label>
            <Button
              onClick={() => removeCampaign(this.props.id)}
              size="mini"
              circular
              floated="right"
              icon="remove"
            />
            <Link
              customer={this.props.customer}
              key={Uniqid}
              to={`/campaigns/edit/${this.props.id}`}
            >
              <Button
                onClick={() => editCampaign(this.props.id)}
                size="mini"
                circular
                floated="right"
                icon="add"
              />
            </Link>
          </List.Content>
        </List.Item>
      </Link>
    );
  }
}

export default connect(null, { removeCampaign, editCampaign })(CampaignsList);
