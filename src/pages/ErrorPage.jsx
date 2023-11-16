import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <p className="no-results-message">
      Oooops...there is something wrong with the url. Try{" "}
      <Link to="/">again</Link>
    </p>
  );
}

export default ErrorPage;
