import { combineReducers } from "redux";
import campaignsReducer from "./campaignsReducer";
import usersReducer from "./usersReducer";
import customersReducer from "./customersReducer";
import messagesReducer from "./messagesReducer";
import carriersReducer from "./carriersReducer";

export default combineReducers({
  users: usersReducer,
  campaigns: campaignsReducer,
  customers: customersReducer,
  messages: messagesReducer,
  carriers: carriersReducer
});
