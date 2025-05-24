// RobotInfoBox.jsx
import React from 'react';
import './RobotInfoBox.css';

const RobotInfoBox = ({ robot }) => {
  if (!robot) return null;

  return (
    <div className="robot-info-box">
      <h2>{robot.name}</h2>
      <p><strong>Apariciones:</strong> {robot.games.join(', ')}</p>
      <p>{robot.description}</p>
    </div>
  );
};

export default RobotInfoBox;
