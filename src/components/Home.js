import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";

const Home = props => {
  // debugger;
  console.log("props inside home", props.messages.length);
  return (
    <div>
      <div className="three column stackable ui grid">
        <div className="column">
          <div className="column ui segment">
            <h2>{props.customers.length}</h2>
            <h2>
              <Link to="/customers">Customers</Link>
            </h2>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <h2>{props.campaigns.length}</h2>
            <h2>
              <Link to="/campaigns">Campaigns</Link>
            </h2>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <h2>{props.messages.length}</h2>
            <h2>
              <Link to="/messages">Messages</Link>
            </h2>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "url(" +
            "https://i.pinimg.com/originals/a3/a6/96/a3a696e43a62cd7e16817accf83c817e.png" +
            ")",
          height: "590px",
          backgroundPosition: "center center no-repeat",
          backgroundSize: "cover"
        }}
      >
        <Header size="huge">Welcome</Header>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    customers: state.customers,
    campaigns: state.campaigns,
    messages: state.messages,
    carriers: state.carriers
  };
};

export default withRouter(connect(mapStateToProps)(Home));
