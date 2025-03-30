import React from "react";
import Button from "../../atoms/Button/Button";
import "./ModeSelector.css";

const ModeSelector = ({ mode, setMode }) => {
  return (
    <div className="mode-selection">
      <Button active={mode === "polygon"} onClick={() => setMode("polygon")}>
        Polygon Mode
      </Button>
      <Button active={mode === "arrow"} onClick={() => setMode("arrow")}>
        Arrow Mode
      </Button>
    </div>
  );
};

export default ModeSelector;
