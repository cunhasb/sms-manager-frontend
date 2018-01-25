import { API_ROOT, HEADERS } from "../constants/";

export const getCampaigns = id => {
  return fetch(`${API_ROOT}/campaigns/${id}`).then(console.log);
};
export const handleOnReceived = () => {};
export const editCampaign = () => {};

export const saveCampaignState = state => {
  return { type: "SAVE_CAMPAIGN_STATE", state: state };
};
export const addCampaign = campaign => {
  // debugger;
  return dispatch => {
    return fetch(`${API_ROOT}/campaigns/`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        campaign: campaign
      })
    })
      .then(res => res.json())
      .then(json => {
        // debugger;
        console.log("fetch add campaign", json);
        dispatch({
          type: "ADD_CAMPAIGN",
          campaign: json
        });
      });
  };
};
export const removeCampaign = id => {
  return dispatch => {
    return (
      fetch(`${API_ROOT}/campaigns/${id}`, { method: "delete" })
        // .catch(error => console.log("Error:", error))
        .then(res => res.json())
        .then(json => {
          console.log("remove", json);
          switch (json.status) {
            case 500:
              // debugger;
              alert(
                "I'm sorry but campaign has dependencies in other tables, and cannot be deleted. Delete all dependecies first, and then try again."
              );
              break;
            default:
              dispatch({
                type: "REMOVE_CAMPAIGN",
                campaign: json
              });
          }
        })
    );
  };
};
