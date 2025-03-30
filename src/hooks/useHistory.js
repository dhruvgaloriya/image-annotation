import { useState, useEffect } from "react";

const useHistory = (annotations, setAnnotations, setSelectedAnnotation) => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (annotations.length === 0 && history.length === 0) return;

    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1));
    }

    const annotationsCopy = JSON.parse(JSON.stringify(annotations));
    setHistory([...history.slice(0, historyIndex + 1), annotationsCopy]);
    setHistoryIndex(historyIndex + 1);
  }, [annotations]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setAnnotations(JSON.parse(JSON.stringify(history[newIndex])));
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setAnnotations([]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setAnnotations(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  return {
    history,
    historyIndex,
    handleUndo,
    handleRedo,
  };
};

export default useHistory;
