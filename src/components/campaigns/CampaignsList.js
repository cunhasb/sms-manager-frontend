import React from "react";
import { Link } from "react-router-dom";

export const CampaignsList = props => {
  return (
    <div>
      <Link to={`/campaigns/${props.id}`}>{props.name}</Link>
    </div>
  );
};
