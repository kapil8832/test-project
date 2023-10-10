import React from "react";
import "./followups.css";
const questions = JSON.parse(localStorage.getItem('questions'))

const Followups = (props) => {
  const handler = (id) => props.actionProvider.handleJavascriptList(id);

  const options = questions?.[props.payload].data.followUp ;

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.queId}
      onClick={() =>handler(option.queId)}
    >
      {option.queText}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default Followups;
