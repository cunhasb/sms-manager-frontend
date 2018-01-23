import { API_ADM_ROOT, HEADERS } from "../constants/";
export const getCarriers = (userId, id) => {
  // debugger;
  // console.log("got inside getcarriers", userId);
  return dispatch => {
    return fetch(`${API_ADM_ROOT}/carriers/`)
      .then(res => res.json())
      .then(json => {
        // console.log("getCarriers fetch", json);
        dispatch({
          type: "ADD_CARRIERS",
          carriers: json
        });
      });
  };
};
