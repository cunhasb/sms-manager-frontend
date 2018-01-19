import { API_ROOT, HEADERS } from "../constants/";
export const getMessages = id => {
  return dispatch => {
    return fetch(`${API_ROOT}/messages/${id}`).then(console.log);
  };
};

export const handleOnReceived = dispatch => {
  debugger;
};

export const addMessage = message => {
  return {
    type: "ADD_CAMPAIGN",
    messages: [...message, message]
  };
};
export const commitAdd = message => {
  // debugger;
  return dispatch => {
    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ title: message })
    }).then(json => {
      console.log("auth-json", json);
      switch (json.status) {
        case 200:
          addMessage(json);
          break;
        case 404:
          console.log("User not found");
          break;
        default:
          console.log("User not authorized");
          break;
      }
    });
  };
};
export const removeMessage = id => {
  return { type: "REMOVE_MESSAGE", messageId: id };
};
