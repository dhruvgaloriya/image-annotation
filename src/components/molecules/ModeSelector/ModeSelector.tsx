import Button from "@/components/atoms/Button/Button";
import React from "react";
import "./ModeSelector.css";

interface ModeSelectorProps {
  mode: "polygon" | "arrow";
  setMode: (mode: "polygon" | "arrow") => void;
}

/**
 * Component for selecting annotation mode (polygon or arrow)
 * @param mode - Current annotation mode
 * @param setMode - Function to set annotation mode
 */
const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
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
