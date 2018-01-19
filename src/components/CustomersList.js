import React from "react";
import { Link } from "react-router-dom";

export const CustomersList = props => {
  return (
    <div>
      <Link to={`/customers/${props.id}`}>{props.name}</Link>
    </div>
  );
};
