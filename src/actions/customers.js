import { API_ROOT, HEADERS } from "../constants/";
export const getCustomers = userId => {
  return dispatch => {
    return fetch(`${API_ROOT}/customers/`).then(console.log);
  };
};
export const getCustomer = (userId, customerId) => {
  return dispatch => {
    return fetch(`${API_ROOT}/customers/${customerId}`).then(console.log);
  };
};

export const addCustomer = customer => {
  return dispatch => {
    return fetch(`${API_ROOT}/customers/`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        customer: customer
      })
    })
      .then(res => res.json())
      .then(json => {
        // debugger;
        console.log("fetch add customer", json);
        dispatch({
          type: "ADD_CUSTOMER",
          customer: json
        });
      });
  };
};
export const removeCustomer = id => {
  return dispatch => {
    return (
      fetch(`${API_ROOT}/customers/${id}`, { method: "delete" })
        // .catch(error => console.log("Error:", error))
        .then(res => res.json())
        .then(json => {
          console.log("remove", json);
          switch (json.status) {
            case 500:
              // debugger;
              alert(
                "I'm sorry but customer has dependencies in other tables, and cannot be deleted. Delete all dependecies first, and then try again."
              );
              break;
            default:
              dispatch({
                type: "REMOVE_CUSTOMER",
                customer: json
              });
          }
        })
    );
  };
};
export const handleOnReceived = dispatch => {
  debugger;
};
export const editCustomer = customer => {
  return { type: "EDIT_CUSTOMER", customerId: customer.id };
};
