export default (state = [], action) => {
  // debugger;
  switch (action.type) {
    case "AUTH_USER": {
      return {
        authUser: action.user
        // customers: action.customers
      };
    }
    default:
      return state;
  }
};
