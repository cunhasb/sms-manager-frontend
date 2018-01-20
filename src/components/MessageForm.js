import React from "react";
import { API_ROOT, HEADERS } from "../constants";

class MessageForm extends React.Component {
  state = {
    text: "",
    campaign_id: this.props.campaign_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ campaign_id: nextProps.campaign_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: "" });
  };

  render = () => {
    return (
      <div className="MessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default MessageForm;
