import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export default function ActionableInput({
  inputLabel,
  buttonLabel,
  value = null,
  disabled = false,
  onClickCallback,
}) {
  return (
    <div className="d-flex">
      <FloatingLabel controlId="floatingInput" label={inputLabel}>
        <Form.Control
          type="text"
          className="rounded-0 rounded-start"
          disabled={disabled}
          value={value}
          placeholder={inputLabel}
        />
      </FloatingLabel>
      <Button
        variant="success"
        style={{ zIndex: 1000 }}
        className="rounded-0 rounded-end"
        onClick={onClickCallback()}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
