import { API_ROOT, API_WS_ROOT } from "../constants/";
import { G_SECRET } from "../secrets.js";

const token = localStorage.getItem("token");

// const headers = {
//   "Content-Type": "application/json",
//   Accepts: "application/json",
//   Authorization: token
// };
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
// const getCampaigns = () => {
//   return fetch(`${API_ROOT}/campaigns/`, { headers: headers }).then(res =>
//     res.json()
//   );
// };

const getCampaigns = id => {
  return fetch(`${API_ROOT}/campaigns/${id}`).then(res => res.json());
};

export const login = user => {
  // debugger;
  fetch(`${API_ROOT}/auth/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      user: user
    })
  }).then(res => res.json());
};

// const getCurrentUser = () => {
//   return fetch(`${API_ROOT}/current_user`, {
//     headers: headers
//   }).then(res => res.json());
// };
export const getCurrentUser = id => {
  return fetch(`${API_ROOT}/current_user/${id}`).then(res => res.json());
};
export default {
  auth: {
    login,
    getCurrentUser
  },
  campaigns: {
    getCampaigns
  }
};
