export default (state = [{ campaignState: "" }], action) => {
  switch (action.type) {
    case "AUTH_USER": {
      return { campaigns: action.campaigns, campaignState: [] };
    }
    case "ADD_CAMPAIGN": {
      // debugger;
      return {
        campaigns: [...state.campaigns, action.campaign],
        campaignState: []
      };
    }
    case "SAVE_CAMPAIGN_STATE": {
      // debugger;
      return { campaigns: state.campaigns, campaignState: action.state };
    }
    default:
      return state;
  }
};
