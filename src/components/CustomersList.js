import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";

export const CustomersList = props => {
  return (
    <div>
      <Link to={`/customers/${props.id}`}>
        <List.Item>
          <Image avatar src={props.image_url} />
          <List.Content>{props.name}</List.Content>
        </List.Item>
      </Link>
    </div>
  );
};
