import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import "normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import store from "./store";
// import setupLocatorUI from "@locator/runtime";
//
// if (process.env.NODE_ENV === "development") {
//   setupLocatorUI();
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
