import React from "react";
import "./UIStates.css";

function EmptyState({
  icon = "fa-solid fa-folder-open",
  title = "No Data Found",
  message = "There is no content available right now.",
  buttonText,
  onButtonClick,
}) {
  return (
    <section className="ui-state-section">
      <div className="ui-state-card">
        <div className="ui-state-icon">
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

export default EmptyState;