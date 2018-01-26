import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Image, List, Button, Icon, Label } from "semantic-ui-react";

export const MessagesList = props => {
  // debugger;
  const Uniqid = require("uniqid");
  const { removeMessage, editMessage } = props;

  let background = "#99cc99";
  let icon = "level down";
  let corner = true;
  if (props.type === "to_user") {
    background = "#cccccc";
    icon = "level up";
    corner = false;
  }
  return (
    <Link to={`/messages/${props.id}`}>
      <List.Item size="huge">
        <List.Content>
          <Icon size="large" fitted corner={corner} name={icon} />
          <div>
            <Label
              as="textarea"
              style={{ width: 170, minHeight: 60, backgroundColor: background }}
              value={props.name}
            />
            <Button
              onClick={() => removeMessage(props.id)}
              size="mini"
              circular
              floated="right"
              icon="remove"
            />
            <Link
              message={props.message}
              key={Uniqid()}
              to={`/messages/edit/${props.id}`}
            >
              <Button
                onClick={() => editMessage(props.id)}
                size="mini"
                circular
                floated="right"
                icon="edit"
              />
            </Link>
          </div>
        </List.Content>
      </List.Item>
    </Link>
  );
};
