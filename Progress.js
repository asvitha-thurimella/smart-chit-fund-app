import React, { useState } from "react";
import "./Progress.css";

const Progress = () => {
  const [membersCount, setMembersCount] = useState(0);
  const [due, setDue] = useState(0);
  const [commission, setCommission] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [memberNames, setMemberNames] = useState([]);

  const handleMemberNamesChange = (index, value) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  const createGroups = () => {
    if (membersCount <= 0 || due <= 0 || commission < 0 || !groupName.trim()) {
      alert("Please enter valid values!");
      return;
    }

    // Total chit amount per month
    const chitValue = membersCount * due;

    // Generate group data for each month = number of members
    const groupData = Array.from({ length: membersCount }, (_, monthIndex) => ({
      id: String.fromCharCode(65 + monthIndex), // A, B, C...
      month: monthIndex + 1,
      name: groupName,
      winnerAmount: chitValue - commission,
      members: Array.from({ length: membersCount }, (_, i) => ({
        id: i + 1,
        name: memberNames[i] || `Person ${i + 1}`,
        due: due,
        paid: false,
      })),
    }));

    setGroups(groupData);
  };

  const togglePaid = (groupId, memberId) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.map((m) =>
            m.id === memberId ? { ...m, paid: !m.paid } : m
          ),
        };
      }
      return group;
    });

    setGroups(updatedGroups);
  };

  return (
    <div className="chit-container">
      <h1 className="title">Chit Fund Progress</h1>

      {/* User Input Section */}
      <div className="input-card">
        <label>
          Number of Members:
          <input
            type="number"
            value={membersCount}
            onChange={(e) => {
              const count = Number(e.target.value);
              setMembersCount(count);
              setMemberNames(Array(count).fill("")); // prepare inputs
            }}
          />
        </label>
        <label>
          Monthly Due (₹):
          <input
            type="number"
            value={due}
            onChange={(e) => setDue(Number(e.target.value))}
          />
        </label>
        <label>
          Commission (₹):
          <input
            type="number"
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
          />
        </label>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>

        {/* Dynamic Member Names */}
        {membersCount > 0 && (
          <div className="member-inputs">
            <h3>Enter Member Names</h3>
            {Array.from({ length: membersCount }).map((_, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Member ${i + 1}`}
                value={memberNames[i] || ""}
                onChange={(e) => handleMemberNamesChange(i, e.target.value)}
              />
            ))}
          </div>
        )}

        <button className="btn btn-create" onClick={createGroups}>
          Create Chit Report
        </button>
      </div>

      {/* Groups Section */}
      {groups.length > 0 && (
        <div className="groups">
          {groups.map((group) => {
            const totalPaid = group.members
              .filter((m) => m.paid)
              .reduce((sum, m) => sum + m.due, 0);
            const remaining = group.members.filter((m) => !m.paid).length;

            return (
              <div key={group.id} className="group-card">
                <h2 className="group-title">
                  {group.name} - Group {group.id} - Month {group.month}
                </h2>

                <div className="stats-grid">
                  <div className="stat-box">
                    Winner Amount: ₹{group.winnerAmount}
                  </div>
                  <div className="stat-box">
                    Organizer Commission: ₹{commission}
                  </div>
                  <div className="stat-box">Total Collected: ₹{totalPaid}</div>
                  <div className="stat-box">Members Left: {remaining}</div>
                </div>

                <table className="members-table">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Due</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((m) => (
                      <tr key={m.id}>
                        <td>{m.name}</td>
                        <td>₹{m.due}</td>
                        <td>{m.paid ? "✅ Paid" : "❌ Not Paid"}</td>
                        <td>
                          <button
                            onClick={() => togglePaid(group.id, m.id)}
                            className={
                              m.paid ? "btn btn-unmark" : "btn btn-mark"
                            }
                          >
                            {m.paid ? "Unmark" : "Mark Paid"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Progress;