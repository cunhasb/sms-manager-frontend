import React, { Component } from "react";
import { connect } from "react-redux";
// import { G_SECRET } from "./secrets.js";
import { startGoogleClient } from "./actions/users";
import { withRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import SmsContainer from "./containers/SmsContainer";
// import CampaignsList from "./components/CampaignsList";

class App extends Component {
  componentDidMount() {
    // console.log("mounting - props", this.props);
    // start();
    // debugger;
    this.props.startGoogleClient();
  }

  handleClientLoad = () => {
    window.gapi.load("client:auth2", this.initClient);
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  // start = () => {
  //   console.log(G_SECRET.id, G_SECRET.scope);
  //   window.gapi.load("auth2", function() {
  //     window.auth2 = window.gapi.auth2.init({
  //       client_id: G_SECRET.id,
  //       scope: G_SECRET.scope
  //     });
  //   });
  // };

  render() {
    // console.log("props", this.props);
    return (
      <div className="App">
        <NavBar />
        <SmsContainer />
      </div>
    );
  }
}

export default withRouter(connect(null, { startGoogleClient })(App));
