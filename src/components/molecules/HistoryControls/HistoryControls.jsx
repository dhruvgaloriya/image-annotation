import React from "react";
import Button from "../../atoms/Button/Button";
import "./HistoryControls.css";

const HistoryControls = ({ handleUndo, handleRedo, historyIndex, history }) => {
  return (
    <div className="history-control">
      <Button onClick={handleUndo} disabled={historyIndex <= -1} title="Undo">
        ↩ Undo
      </Button>
      <Button
        onClick={handleRedo}
        disabled={historyIndex >= history.length - 1}
        title="Redo"
      >
        ↪ Redo
      </Button>
    </div>
  );
};

export default HistoryControls;
