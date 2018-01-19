import { API_ROOT } from "../constants/";
export const getCampaigns = userId => {
  return dispatch => {
    return fetch(`${API_ROOT}/campaigns/${userId}`).then(console.log);
  };
};
export const addCampaign = campaign => {
  return {
    type: "ADD_CAMPAIGN",
    campaigns: [...campaign, campaign]
  };
};
export const removeCampaign = id => {
  return { type: "REMOVE_CAMPAIGN", campaignId: id };
};
export const handleOnReceived = dispatch => {
  debugger;
};
