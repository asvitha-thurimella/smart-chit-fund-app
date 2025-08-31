import React, { useState } from "react";
import "./Dashboard.css";

const CreateGroup = ({ onCreate, onCancel }) => {
  const [groupName, setGroupName] = useState("");
  const [chitMoney, setChitMoney] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim() || !chitMoney || isNaN(chitMoney) || chitMoney <= 0) {
      alert("Please enter a valid group name and chit money.");
      return;
    }
    onCreate(groupName.trim(), chitMoney);
  };

  return (
    <div className="create-group-overlay">
      <form className="create-group-form" onSubmit={handleSubmit}>
        <h3>Create New Group</h3>

        <label>Group Name</label>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
          autoFocus
        />

        <label>Chit Money (₹)</label>
        <input
          type="number"
          placeholder="Enter chit money"
          value={chitMoney}
          onChange={(e) => setChitMoney(e.target.value)}
          required
          min={1}
        />

        <div className="form-buttons">
          <button type="submit" className="create-btn">
            Create
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;