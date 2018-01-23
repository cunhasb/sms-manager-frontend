import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Image, List, Button, Icon } from "semantic-ui-react";

export const MessagesList = props => {
  return (
    <Link to={`/messages/${props.id}`}>
      <List.Item size="huge">
        <List.Content>
          {props.name}
          <Button
            as="icon"
            size="mini"
            circular
            floated="right"
            positive
            icon="add"
          />
          <Button
            as="icon"
            size="mini"
            circular
            floated="right"
            negative
            icon="remove"
          />
        </List.Content>
      </List.Item>
    </Link>
  );
};
