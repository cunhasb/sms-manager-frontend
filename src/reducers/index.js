import { combineReducers } from "redux";
import campaignsReducer from "./campaignsReducer";
import usersReducer from "./usersReducer";
import customersReducer from "./customersReducer";

export default combineReducers({
  users: usersReducer,
  campaigns: campaignsReducer,
  customers: customersReducer
});
