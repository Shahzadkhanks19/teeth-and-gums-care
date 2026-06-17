import React from "react";
import "./UIStates.css";

function LoadingState({
  title = "Loading...",
  message = "Please wait while we prepare the content.",
}) {
  return (
    <section className="ui-state-section">
      <div className="ui-state-card">
        <div className="ui-loader"></div>

        <h2>{title}</h2>

        <p>{message}</p>
      </div>
    </section>
  );
}

export default LoadingState;