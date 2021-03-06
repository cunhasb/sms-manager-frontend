import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

export function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export const store = configureStore();
