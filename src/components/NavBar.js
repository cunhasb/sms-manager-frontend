import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { startGoogleClient, handleSignIn } from "../actions/users";
import { Icon } from "semantic-ui-react";
import Cable from "./Cable";

const NavBar = props => {
  // console.log("navbar", props);
  return (
    <div className="ui massive menu">
      <Cable />
      <NavLink className="active item" to="/home">
        <Icon.Group>
          <Icon loading size="huge" name="sun" />
          <Icon name="home" size="big" />
        </Icon.Group>
      </NavLink>
      <div className="right menu item ">
        <NavLink
          onClick={() => props.handleSignIn()}
          className="ui primary button"
          to="/"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};
const mapStateToProps = store => {
  // debugger;
  return {
    user: store.users.authUser,
    campaigns: store.campaigns
  };
};
// const dispatchStateToProps = store => {
//   debugger;
//   return {};
// };
export default connect(mapStateToProps, { startGoogleClient, handleSignIn })(
  withRouter(NavBar)
);
