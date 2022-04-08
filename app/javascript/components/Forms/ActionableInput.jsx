import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export default function ActionableInput({
  inputLabel,
  buttonLabel,
  value = "",
  disabled = false,
  onClickCallback,
  buttonClassNames = "",
  inputClassNames = "",
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const value = inputValue;
    setInputValue("");
    onClickCallback(value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="d-flex">
      <FloatingLabel
        controlId="floatingInput"
        label={inputLabel}
        style={{ flexGrow: 2 }}
      >
        <Form.Control
          type="text"
          className={`rounded-0 rounded-start ${inputClassNames}`}
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder={inputLabel}
        />
      </FloatingLabel>
      <Button
        variant="success"
        style={{ zIndex: 1000 }}
        className={`rounded-0 rounded-end ${buttonClassNames}`}
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
