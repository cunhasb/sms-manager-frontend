import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { ActionCableProvider } from "react-actioncable-provider";
import { API_WS_ROOT } from "./constants";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ActionCableProvider url={API_WS_ROOT}>
        <App store={store} />
      </ActionCableProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
