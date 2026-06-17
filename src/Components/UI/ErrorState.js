import React from "react";
import "./UIStates.css";

function ErrorState({
  icon = "fa-solid fa-triangle-exclamation",
  title = "Something Went Wrong",
  message = "We could not load this content. Please try again.",
  buttonText = "Try Again",
  onButtonClick,
}) {
  return (
    <section className="ui-state-section">
      <div className="ui-state-card error-state">
        <div className="ui-state-icon error-icon">
          <i className={icon}></i>
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        {buttonText && (
          <button className="ui-state-btn" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}

export default ErrorState;