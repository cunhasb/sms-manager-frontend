// import { login, currentUser } from "../services/api";
import { API_ROOT } from "../constants/";
import { G_SECRET } from "../secrets.js";
import { getMessages, addMessages } from "./messages";
import { getCarriers } from "./carriers";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "this is my token"
};

export const startGoogleClient = dispatch => {
  return dispatch => {
    window.gapi.load("auth2", function() {
      window.auth2 = window.gapi.auth2.init({
        client_id: G_SECRET.id,
        scope: G_SECRET.scope
      });
    });
  };
};

export const handleOnReceived = dispatch => {
  debugger;
};
export const handleSignIn = dispatch => {
  return dispatch => {
    window.auth2
      .grantOfflineAccess()
      .then(authResult => {
        let user = "";
        if (authResult["code"]) {
          const getProfile = window.auth2.currentUser.get().getBasicProfile();
          user = {
            g_id: getProfile.getId(),
            email: getProfile.getEmail(),
            name: getProfile.getName(),
            family_name: getProfile.getFamilyName(),
            given_name: getProfile.getGivenName(),
            image_url: getProfile.getImageUrl(),
            code: authResult["code"]
          };
        }
        return user;
      })
      .then(user => {
        // console.log("before authUsercall", user);
        fetch(`${API_ROOT}/auth/`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            user: user
          })
        })
          .then(res => res.json())
          .then(json => {
            // console.log("auth-json", json);
            switch (json.status) {
              case 200:
                // debugger;
                dispatch({
                  type: "AUTH_USER",
                  user: json.user,
                  campaigns: json.campaigns,
                  customers: json.customers
                });
                break;
              case 404:
                console.log("User not found");
                break;
              default:
                console.log("User not authorized");
                break;
            }
            return json.user;
          })
          .then(user => {
            return user;
            dispatch(getMessages(user.id));
          })
          .then(user => dispatch(getCarriers(user.id)));
        // return user;
      });
  };
};
