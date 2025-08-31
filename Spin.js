import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./Spin.css";

const Spin = () => {
  const [members, setMembers] = useState([]);
  const [input, setInput] = useState("");
  const [winner, setWinner] = useState(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // ✅ Add member (no duplicates, no empty)
  const addMember = () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      alert("Please enter a name");
      return;
    }

    // check duplicates (case-insensitive)
    const exists = members.some(
      (m) => m.option.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      alert("This member is already added!");
      return;
    }

    setMembers([...members, { option: trimmed }]);
    setInput("");
  };

  // Spin the wheel
  const handleSpinClick = () => {
    if (members.length === 0) {
      alert("Please add members first!");
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * members.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  // After spin stop
  const handleStopSpinning = () => {
    setMustSpin(false);
    const chosenWinner = members[prizeNumber].option;
    setWinner(chosenWinner);

    // Remove winner from list (no repeat in next spins)
    setMembers(members.filter((_, index) => index !== prizeNumber));
  };

  // Share winner
  const shareWinner = (platform) => {
    if (!winner) return;
    const message = `🎉 The winner of Smart Chit Fund Spinner is: ${winner}! 🎡`;

    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else if (platform === "sms") {
      window.open(`sms:?body=${encodeURIComponent(message)}`);
    } else if (platform === "copy") {
      navigator.clipboard.writeText(message);
      alert("Winner copied to clipboard!");
    }
  };

  return (
    <div className="spin-container">
      <h1 className="spin-title">Smart Chit Fund Spinner 🎉</h1>

      {/* Add members */}
      <div className="add-member">
        <input
          type="text"
          placeholder="Enter member name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={addMember}>
          Add Member
        </button>
      </div>

      {/* Show wheel only if members exist */}
      {members.length > 0 ? (
        <div className="wheel-section">
          <div className="wheel-box">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={members}
              onStopSpinning={handleStopSpinning}
              backgroundColors={[
                "#00C49F",
                "#FFBB28",
                "#FF8042",
                "#0088FE",
                "#A569BD",
                "#E74C3C",
              ]}
              textColors={["#ffffff"]}
              fontSize={16}
              outerBorderColor="#222"
              outerBorderWidth={4}
              radiusLineColor="#fff"
              radiusLineWidth={2}
            />
          </div>
          <button
            className={`spin-btn ${mustSpin ? "disabled" : ""}`}
            onClick={handleSpinClick}
            disabled={mustSpin}
          >
            {mustSpin ? "Spinning..." : "Spin"}
          </button>
        </div>
      ) : (
        <p className="no-members">⚠️ No members yet. Add some to spin.</p>
      )}

      {/* Show winner */}
      {winner && (
        <div className="winner-info">
          <h3>🎊 Winner 🎊</h3>
          <p className="winner-name">{winner}</p>
          <div className="share-buttons">
            <button onClick={() => shareWinner("whatsapp")}>
              📲 Share on WhatsApp
            </button>
            <button onClick={() => shareWinner("copy")}>🔗 Copy Link</button>
            <button onClick={() => shareWinner("sms")}>💬 Share via SMS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spin;