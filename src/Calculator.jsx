// Calculator.js
import React, { useState } from "react";
import Operator from "./Operator";
import Tag from "./Tag";
import Expression from "./Expression";

const operators = ["+", "-", "*", "/", "(", ")"];
const tags = [
  { name: "SUM" },
  { name: "payment processing fees" },
  { name: "payroll bonuses G&A" },
  { name: "Payroll Bonuses S&M" },
  { name: "Salary Increase Month" },
];

function Calculator() {
  const [elements, setElements] = useState([]);

  const handleAddElement = (element) => {
    setElements([...elements, element]);
  };

  const handleDeleteElement = (index) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  return (
    <div className="calculator">
      <div className="input-section">
        <Expression elements={elements} />
        <input className="input" type="text" placeholder="Enter element" />
        {/* Autocomplete suggestions and add element logic */}
        {/* ... */}
      </div>
      <div className="elements-list">
        {elements.map((element, index) => {
          if (element.type === "operator") {
            return (
              <Operator
                key={index}
                operator={element.operator}
                onDelete={() => handleDeleteElement(index)}
              />
            );
          } else if (element.type === "tag") {
            return (
              <Tag
                key={index}
                tag={element.tag}
                xValue={element.xValue}
                onDelete={() => handleDeleteElement(index)}
                onEdit={(newXValue) => {
                  // Handle editing xValue
                }}
              />
            );
          } else if (element.type === "result") {
            return (
              <div key={index} className="result">
                Result: {element.value}
              </div>
            );
          }
          return null;
        })}
      </div>
      <button className="calculate-button">Calculate</button>
    </div>
  );
}

export default Calculator;