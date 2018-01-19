export default (state = [], action) => {
  // debugger;
  switch (action.type) {
    case "AUTH_USER": {
      return {
        // authUser: action.user,
        customers: action.customers
      };
    }
    case "ADD_CUSTOMERS": {
      // debugger;
      return [...state.customers, action.customers];
    }

    default:
      return state;
  }
};
