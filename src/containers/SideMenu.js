import React from "react";
import { Input, Label, Menu, List, Icon } from "semantic-ui-react";

const SideMenu = props => {
  // debugger;
  return (
    <div className="ui massive vertical menu ">
      <div className="ui horizontally fitted item">
        <div className="ui icon input ">
          <input
            className="ui"
            type="text"
            name="query"
            placeholder={props.searchBy}
            onChange={props.handleChange}
            value={props.query}
          />
          <Icon name="search" />
        </div>
      </div>
      <div className="active item">
        <div className=" bottom attached segment pushable">
          <div
            className="ui secondary vertical pointing menu pusher"
            style={{
              overflowY: "auto",
              whiteSpace: "nowrap",
              height: "700px",
              width: "100%",
              textAlign: "left"
            }}
          >
            {props.List}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
