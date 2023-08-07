// Operator.js
import React from "react";

function Operator({ operator, onDelete }) {
  return (
    <div className="element operator">
      <span>{operator}</span>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default Operator;