import React, { useRef, useState } from "react";
import "./App.css";
import { create, all } from "mathjs";

const math = create(all);

const operators = ["+", "-", "*", "/", "(", ")"];
const tags = [
  { name: "SUM", defaultValue: 0 },
  { name: "payment processing fees", defaultValue: 100 },
  { name: "payroll bonuses G&A", defaultValue: 200 },
  { name: "Payroll Bonuses S&M", defaultValue: 150 },
  { name: "Salary Increase Month", defaultValue: 300 },
];

const Operator = ({ name, handleOperatorClick }) => {
  return (
    <span
      className="operator"
      onClick={() => handleOperatorClick(name)}
    >
      {name}
    </span>
  );
};

const Tag = ({ tag, isSelected, handleTagClick, handleRemove, handleValueChange }) => {
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(tag.defaultValue);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleXValueChange = (event) => {
    const newX = event.target.value;
    setX(newX);
    handleValueChange(newX);
  };

  return (
    <div className={`wrp ${isSelected ? "selected" : ""}`}>
      <button onClick={() => handleTagClick(tag)} className="tag-button">
        {tag.name} | [{x === undefined ? "x" : x}]
      </button>
      {visible && (
        <div className="inr">
          <input
            type="number"
            placeholder="x value"
            value={x || ""}
            onChange={handleXValueChange}
          />
          <button onClick={handleRemove}>Delete</button>
        </div>
      )}
    </div>
  );
};

function App() {
  const inputRef = useRef(null);
  const [state, setState] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [value, setValue] = useState("");
  const [showOperatorDropdown, setShowOperatorDropdown] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleValueChange = (index, newValue) => {
    const updatedState = [...state];
    updatedState[index].x = newValue;
    setState(updatedState);
  };

  const handleTagClick = (clickedTag) => {
    if (selectedTags.includes(clickedTag)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== clickedTag));
    } else {
      setSelectedTags([...selectedTags, clickedTag]);
    }
    setShowOperatorDropdown(true);
  };

  const handleTagRemove = (index) => {
    const updatedState = state.filter((_, i) => i !== index);
    setState(updatedState);
  };

  const handleOperatorClick = (operator) => {
    setSelectedOperator(operator);
    setShowOperatorDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      if (operators.includes(value)) {
        setState([...state, { name: value, type: "operator" }]);
        setValue("");
      } else {
        const matchingTag = tags.find(
          (tag) => tag.name.toLowerCase() === value.toLowerCase()
        );

        if (matchingTag) {
          setState([
            ...state,
            { type: "tag", tag: matchingTag, x: matchingTag.defaultValue },
          ]);
          setValue("");
        }
      }
    }
  };

  const handleCalculate = () => {
    let expression = selectedTags
      .map((tag) => (tag.x !== undefined ? tag.x : tag.defaultValue))
      .join(` ${selectedOperator} `);

    try {
      const result = math.evaluate(expression);
      setState([...state, { type: "result", result }]);
      setSelectedTags([]);
      setSelectedOperator("");
      setShowOperatorDropdown(false);
    } catch (error) {
      console.error("Error calculating expression:", error);
    }
  };

  return (
    <>
      <div>
        <h1>
   G SUITE CALCULATOR
         
        </h1>
        <div>
          <div className="container">
            {state.map((v, i) =>
              v.type === "tag" ? (
                <Tag
                  key={i}
                  tag={v.tag}
                  isSelected={selectedTags.includes(v.tag)}
                  handleTagClick={handleTagClick}
                  x={v.x}
                  handleRemove={() => handleTagRemove(i)}
                  handleValueChange={(newX) => handleValueChange(i, newX)}
                />
              ) : v.type === "result" ? (
                <div key={i} className="result">
                  Result: {v.result}
                </div>
              ) : (
                <Operator
                  key={i}
                  name={v.name}
                  handleOperatorClick={handleOperatorClick}
                />
              )
            )}

            <div className="input-wrapper">
              <input
                value={value}
                ref={inputRef}
                className="input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type here..."
              />

              {value.trim() !== "" && (
                <div className="input-suggestions">
                  {tags
                    .filter((name) =>
                      name.name.toLowerCase().includes(value.toLowerCase())
                    )
                    .map((f) => (
                      <button
                        key={f.name}
                        onClick={() => {
                          setState([
                            ...state,
                            { type: "tag", tag: f, x: f.defaultValue },
                          ]);
                          setValue("");
                        }}
                      >
                        {f.name} <span>calculation</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="operator-section">
        {showOperatorDropdown ? (
          <div className="operator-dropdown">
            <p>Select an operator:</p>
            {operators.map((op, index) => (
              <Operator
                key={index}
                name={op}
                handleOperatorClick={handleOperatorClick}
              />
            ))}
          </div>
        ) : null}
        {selectedOperator && (
          <button className="calculate-button" onClick={handleCalculate}>
            Calculate
          </button>
        )}
      </div>
      <ul>
        <li>Press space to add arithmetic operators [+,-,*,(, )]</li>
        <li>Select tags by clicking on them and then choose an operator.</li>
        <li>Click "Calculate" to see the result of the expression.</li>
      </ul>
    </>
  );
}

export default App;
