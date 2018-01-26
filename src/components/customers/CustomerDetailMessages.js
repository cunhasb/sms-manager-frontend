import React, { Component } from "react";
import {
  Header,
  Icon,
  Menu,
  Container,
  Segment,
  Label,
  Comment
} from "semantic-ui-react";
export const CustomerDetailMessages = props => {
  console.log("customers detail messages", props);
  const {
    id,
    label_ids,
    name,
    message,
    read,
    campaign: { id: campaignId, campName, campMessage },
    customer: { id: customerId, custName, email, phone, status, image_url }
  } = props.message;
  return (
    <Comment>
      <Comment.Avatar as="a" src={image_url} />
      <Comment.Content>
        <Comment.Author as="a">{custName}</Comment.Author>
        <Comment.Text>{name}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};
