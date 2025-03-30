import React from "react";
import "./StatusBar.css";

const StatusBar = ({ annotations }) => {
  return (
    <div className="status-bar">
      <div className="annotation-count">Annotations: {annotations.length}</div>
    </div>
  );
};

export default StatusBar;
