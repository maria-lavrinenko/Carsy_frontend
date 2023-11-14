import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthContextWrapper from "./context/AuthContext.jsx";
import FormContextWrapper from "./context/FormContext.jsx";
import AuthFormContextWrapper from "./context/AuthFormContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthFormContextWrapper>
        <AuthContextWrapper>
          <FormContextWrapper>
            <App />
          </FormContextWrapper>
        </AuthContextWrapper>
      </AuthFormContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
