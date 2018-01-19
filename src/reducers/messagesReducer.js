export default (state = [], action) => {
  // debugger;
  switch (action.type) {
    case "AUTH_USER": {
      return {
        // authUser: action.user,
        messages: action.messages
      };
    }
    case "ADD_MESSAGES": {
      // debugger;
      return [...state.messages, action.messages];
    }
    default:
      return state;
  }
};
