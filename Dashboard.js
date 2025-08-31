import React, { useState } from "react";
import CreateGroup from "./CreateGroup";
import "./Dashboard.css";
import {
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiUserPlus,
  FiTrash2,
} from "react-icons/fi";

const initialGroups = [
  {
    id: 1,
    name: "Group A",
    chitMoney: 10000,
    members: [
      {
        id: 1,
        name: "Alice",
        phone: "9876543210",
        email: "alice@mail.com",
        telecom: "Jio",
        paid: true,
      },
      {
        id: 2,
        name: "Bob",
        phone: "8765432109",
        email: "bob@mail.com",
        telecom: "Airtel",
        paid: false,
      },
    ],
  },
  {
    id: 2,
    name: "Group B",
    chitMoney: 20000,
    members: [
      {
        id: 3,
        name: "Charlie",
        phone: "7654321098",
        email: "charlie@mail.com",
        telecom: "Vodafone",
        paid: true,
      },
    ],
  },
];

// Telecom auto detection based on phone prefix
const detectTelecom = (phone) => {
  if (!phone) return "Unknown";
  if (/^[789]/.test(phone)) return "Jio";
  if (/^6/.test(phone)) return "Airtel";
  if (/^5/.test(phone)) return "Vodafone";
  return "Other";
};

const Dashboard = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const toggleGroup = (id) => {
    setExpandedGroupId(expandedGroupId === id ? null : id);
  };

  const addGroup = (groupName, chitMoney) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      chitMoney: Number(chitMoney),
      members: [],
    };
    setGroups([...groups, newGroup]);
    setShowCreateGroup(false);
  };

  const addMember = (groupId, member) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, members: [...group.members, { ...member, id: Date.now() }] }
          : group
      )
    );
  };

  // NEW: Delete member from a group
  const deleteMember = (groupId, memberId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.filter((m) => m.id !== memberId),
            }
          : group
      )
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Chit Fund Dashboard</h1>
          <button className="create-group-btn" onClick={() => setShowCreateGroup(true)}>
            <FiPlus size={20} /> Create Group
          </button>
        </header>

        {showCreateGroup && (
          <CreateGroup onCreate={addGroup} onCancel={() => setShowCreateGroup(false)} />
        )}

        <div className="groups-list">
          {groups.length === 0 && <p>No groups found. Create one!</p>}

          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-summary" onClick={() => toggleGroup(group.id)}>
                <div>
                  <strong>{group.name}</strong>
                </div>
                <div>Members: {group.members.length}</div>
                <div>Total Money: ₹{group.chitMoney}</div>
                <div className="expand-icon">
                  {expandedGroupId === group.id ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </div>

              {expandedGroupId === group.id && (
                <GroupMembers
                  group={group}
                  onAddMember={(member) => addMember(group.id, member)}
                  onDeleteMember={(memberId) => deleteMember(group.id, memberId)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GroupMembers = ({ group, onAddMember, onDeleteMember }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberTelecom, setMemberTelecom] = useState("");

  const handleAddMember = () => {
    if (!memberName || !memberPhone || !memberEmail) {
      alert("Please fill all member fields.");
      return;
    }
    if (memberPhone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return;
    }

    const telecom = memberTelecom || detectTelecom(memberPhone);

    onAddMember({ name: memberName, phone: memberPhone, email: memberEmail, telecom, paid: false });
    setMemberName("");
    setMemberPhone("");
    setMemberEmail("");
    setMemberTelecom("");
    setShowAddMember(false);
  };

  return (
    <div className="members-container">
      <h4>Members</h4>
      {group.members.length === 0 && <p>No members in this group yet.</p>}
      <ul>
        {group.members.map((m) => (
          <li key={m.id} className="member-item">
            <span>{m.name}</span>
            <span>
              <a href={`tel:+91${m.phone}`} className="phone-link">
                +91 {m.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}
              </a>
            </span>
            <span>{m.email}</span>
            <span>{m.telecom || "N/A"}</span>
            <span
              className="delete-member"
              onClick={() => {
                if (window.confirm(`Delete member ${m.name}?`)) {
                  onDeleteMember(m.id);
                }
              }}
              title="Delete Member"
            >
              <FiTrash2 color="#e63946" size={18} style={{ cursor: "pointer" }} />
            </span>
          </li>
        ))}
      </ul>

      {showAddMember ? (
        <div className="add-member-form">
          <input
            type="text"
            placeholder="Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone (10 digits)"
            value={memberPhone}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,10}$/.test(val)) setMemberPhone(val);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telecom (e.g., Jio, Airtel) - Optional"
            value={memberTelecom}
            onChange={(e) => setMemberTelecom(e.target.value)}
          />
          <div className="form-buttons">
            <button onClick={handleAddMember} className="add-btn">
              <FiUserPlus size={18} /> Add Member
            </button>
            <button className="cancel-btn" onClick={() => setShowAddMember(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="add-member-btn" onClick={() => setShowAddMember(true)}>
          <FiPlus size={16} /> Add Member
        </button>
      )}
    </div>
  );
};

export default Dashboard;