import React from "react";

function Expression({ elements }) {
  return (
    <div className="expression">
      {elements.map((element, index) => {
        if (element.type === "operator") {
          return <span key={index}>{element.operator}</span>;
        } else if (element.type === "tag") {
          return (
            <span key={index}>
              {element.tag} {typeof element.xValue !== "undefined" && `(${element.xValue})`}
            </span>
          );
        } else if (element.type === "result") {
          return <span key={index}>Result: {element.value}</span>;
        }
        return null;
      })}
    </div>
  );
}

export default Expression;
