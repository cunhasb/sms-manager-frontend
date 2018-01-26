export default (state = [], action) => {
  // debugger;
  switch (action.type) {
    // case "AUTH_USER": {
    //   return action.messages;
    // }
    case "ADD_MESSAGES": {
      // debugger;
      console.log("messages reducer", action);
      return action.messages;
    }
    case "REMOVE_CUSTOMERS":
      debugger;
    default:
      return state;
  }
};
