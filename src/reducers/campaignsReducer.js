export default (state = [{ campaignState: "" }], action) => {
  switch (action.type) {
    case "AUTH_USER": {
      return action.campaigns;
    }
    case "ADD_CAMPAIGN": {
      // debugger;
      return [...state, action.campaign];
    }
    case "SAVE_CAMPAIGN_STATE": {
      debugger;
      return { state: { campaignState: action.state } };
    }
    default:
      return state;
  }
};
