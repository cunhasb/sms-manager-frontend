export default (state = [], action) => {
  switch (action.type) {
    case "AUTH_USER": {
      return action.campaigns;
    }
    case "ADD_CAMPAIGN": {
      // debugger;
      return [...state, action.campaign];
    }
    default:
      return state;
  }
};
