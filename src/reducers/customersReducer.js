const customersReducer = (state = [], action) => {
  // debugger;
  let index;
  let quote;
  switch (action.type) {
    case "AUTH_USER": {
      return action.customers;
    }
    case "ADD_CUSTOMER": {
      // console.log("add_customer", action);
      // console.log("customer -state", state);
      return [...state, action.customer];
    }
    case "REMOVE_CUSTOMER": {
      index = state.findIndex(customer => customer.id === action.customer.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case "SAVE_SELECTED_CUSTOMER": {
      let newState = state;
      state.selectedCustomer = action.customer;
      return state;
    }
    default:
      return state;
  }
};
export default customersReducer;
