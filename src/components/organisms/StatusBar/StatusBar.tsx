import React from "react";
import "./StatusBar.css";

interface StatusBarProps {
  annotations: any[];
}

/**
 * Status bar component showing annotation count
 * @param annotations - Array of annotations to count
 */
const StatusBar: React.FC<StatusBarProps> = ({ annotations }) => {
  return (
    <div className="status-bar">
      <div className="annotation-count">Annotations: {annotations.length}</div>
    </div>
  );
};

export default StatusBar;
