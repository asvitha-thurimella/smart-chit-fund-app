import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [members, setMembers] = useState(20);
  const [contribution, setContribution] = useState(5000);
  const [commissionPercent, setCommissionPercent] = useState(3);
  const [month, setMonth] = useState(1);
  const [winner, setWinner] = useState("Member 1");
  const [results, setResults] = useState(null);

  const calculateChit = () => {
    let totalPool = members * contribution;
    let commission = (totalPool * commissionPercent) / 100;
    let winnerPayout = totalPool - commission;

    setResults({
      totalPool,
      commission,
      winnerPayout,
      winner,
    });
  };

  return (
    <div className="chit-calculator">
      <h1>💰 Chit Fund Calculator</h1>

      {/* Inputs */}
      <div className="chit-form">
        <div>
          <label>Number of Members</label>
          <input
            type="number"
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Monthly Contribution (₹)</label>
          <input
            type="number"
            value={contribution}
            onChange={(e) => setContribution(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Commission %</label>
          <input
            type="number"
            value={commissionPercent}
            onChange={(e) => setCommissionPercent(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Month</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Winner Selection */}
      <div className="winner-section">
        <label>Select Winner</label>
        <select value={winner} onChange={(e) => setWinner(e.target.value)}>
          {Array.from({ length: members }, (_, i) => (
            <option key={i} value={`Member ${i + 1}`}>
              Member {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Button */}
      <button className="calculate-btn" onClick={calculateChit}>
        Calculate
      </button>

      {/* Results */}
      {results && (
        <div className="results">
          <h2>Results</h2>
          <p>Total Pool (Month {month}): ₹{results.totalPool.toLocaleString()}</p>
          <p>Organizer Commission: ₹{results.commission.toFixed(2)}</p>
          <p>Winner Payout: ₹{results.winnerPayout.toFixed(2)}</p>
          <p>Selected Winner: {results.winner}</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;