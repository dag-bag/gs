// Tag.js
import React from "react";

function Tag({ tag, xValue, onDelete, onEdit }) {
  return (
    <div className="element tag">
      <span>{tag}</span>
      {typeof xValue !== "undefined" && (
        <span className="x-value">x: {xValue}</span>
      )}
      <button className="edit-button" onClick={() => onEdit(xValue)}>
        Edit
      </button>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default Tag;