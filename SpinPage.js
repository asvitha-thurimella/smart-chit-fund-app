import React from "react";
import Spin from "../components/Spin/Spin";

// Sample members array for demonstration
const sampleMembers = [
  { name: "Alice", phone: "919876543210", email: "alice@example.com" },
  { name: "Bob", phone: "919123456789", email: "bob@example.com" },
  { name: "Charlie", phone: "919998877665", email: "charlie@example.com" },
];

const SpinPage = () => {
  return (
    <div className="spin-page">
      <Spin members={sampleMembers} />
    </div>
  );
};

export default SpinPage;