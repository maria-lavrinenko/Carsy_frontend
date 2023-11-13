import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthContextWrapper from "./context/AuthContext.jsx";
import FormContextWrapper from "./context/FormContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <FormContextWrapper>
          <App />
        </FormContextWrapper>
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
