import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function StackPlus({ currentTotal, drawCallback }) {
  const colourFor = (colour) => {
    switch (colour) {
      case "GREEN":
        return "#207120";
      case "BLUE":
        return "#2b3493";
      case "RED":
        return "#9d2323";
      case "YELLOW":
        return "#bfc642";
      case "WILD":
        return "#000000";
    }
  };

  return (
    <div className="p-2 px-4">
      <h4 className="text-center">
        Play a <FontAwesomeIcon icon="plus" size="xs" /> card or draw
      </h4>
      <div className="d-flex flex-column py-4">
        <h1 className="text-center">
          <FontAwesomeIcon icon="plus" size="sm" /> {currentTotal}
        </h1>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => drawCallback()}
          className="btn btn-success fw-bold w-100"
        >
          Draw
        </button>
      </div>
    </div>
  );
}
