import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export default function ActionableInput({
  inputLabel,
  buttonLabel,
  value = "",
  disabled = false,
  clearOnSubmit = false,
  onClickCallback,
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
      <FloatingLabel controlId="floatingInput" label={inputLabel}>
        <Form.Control
          type="text"
          className="rounded-0 rounded-start"
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
        className="rounded-0 rounded-end"
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
