import axios from "axios";
import React, { useState } from "react";

export default function CreatePlayer({ createPlayerCallback }) {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/v1/users", { player: { name: name } }).then((response) => {
      createPlayerCallback(response.data.player);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="player_name">Name</label>
        <input
          type="text"
          id="player_name"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}
