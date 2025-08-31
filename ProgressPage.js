import React from "react";
import Progress from "../components/Progress/Progress";

const sampleProgressData = {
  groupName: "Example Group",
  commissionPercent: 5,
  members: [
    { name: "Alice", paid: true, pendingAmount: 0 },
    { name: "Bob", paid: false, pendingAmount: 1000 },
    { name: "Charlie", paid: true, pendingAmount: 0 },
  ],
};

const ProgressPage = () => {
  return (
    <div className="progress-page">
      <Progress groupProgress={sampleProgressData} />
    </div>
  );
};

export default ProgressPage;