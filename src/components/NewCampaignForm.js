import React from "react";
import { connect } from "react-redux";
import { commitAdd } from "../actions/campaigns";

class NewCampaignForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("hit submit", this.state.name);
    // debugger;
    this.props.commitAdd(this.state.name);
  };

  render = () => {
    return (
      <div className="newCampaignForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Campaign:</label>
          <br />
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default connect(null, { commitAdd })(NewCampaignForm);
