import { API_ROOT, HEADERS } from "../constants/";
export const getCampaigns = id => {
  return dispatch => {
    return fetch(`${API_ROOT}/campaigns/${id}`).then(console.log);
  };
};
export const addCampaign = campaign => {
  // debugger;
  return {
    type: "ADD_CAMPAIGN",
    campaigns: [...campaign, campaign]
  };
};

export const handleOnReceived = dispatch => {
  debugger;
};

export const commitAdd = campaign => {
  // debugger;
  return dispatch => {
    fetch(`${API_ROOT}/campaigns`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ title: campaign })
    })
      .then(res => res.json())
      .then(json =>
        dispatch({
          type: "ADD_CAMPAIGN",
          campaign: json
        })
      );
  };
};
export const removeCampaign = id => {
  return { type: "REMOVE_CAMPAIGN", campaignId: id };
};
