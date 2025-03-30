import React from "react";
import "./StatusBar.css";

const StatusBar = ({ historyIndex, history, annotations }) => {
  return (
    <div className="status-bar">
      <div className="history-status">
        History: {historyIndex + 1}/{history.length} states
      </div>
      <div className="annotation-count">Annotations: {annotations.length}</div>
    </div>
  );
};

export default StatusBar;
