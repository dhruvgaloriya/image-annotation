import DragDropArea from "@/components/atoms/DragDropArea/DragDropArea";
import FileInput from "@/components/atoms/FileInput/FileInput";
import ActionButtons from "@/components/molecules/ActionButtons/ActionButtons";
import ModeSelector from "@/components/molecules/ModeSelector/ModeSelector";
import React from "react";
import "./Toolbar.css";

interface ToolbarProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  mode: "polygon" | "arrow";
  setMode: (mode: "polygon" | "arrow") => void;
  handleDelete: () => void;
  selectedAnnotation: number | null;
  annotations: any[];
  handleClearAll: () => void;
  currentAnnotation: any[];
  handleCancelAnnotation: () => void;
  exportAnnotations: () => void;
  exportAsImage: () => void;
  image: string | null;
  error: string | null;
  clearError: () => void;
}

/**
 * Main toolbar component containing all annotation controls
 * @param props - All toolbar props including handlers and state
 */
const Toolbar: React.FC<ToolbarProps> = ({
  handleImageUpload,
  handleDragOver,
  handleDrop,
  mode,
  setMode,
  handleDelete,
  selectedAnnotation,
  annotations,
  handleClearAll,
  currentAnnotation,
  handleCancelAnnotation,
  exportAnnotations,
  exportAsImage,
  image,
  error,
  clearError,
}) => {
  return (
    <div className="toolbar">
      <div className="upload-area">
        <FileInput handleImageUpload={handleImageUpload} />
        <DragDropArea
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          error={error}
          clearError={clearError}
        />
      </div>

      <ModeSelector mode={mode} setMode={setMode} />
      <ActionButtons
        handleDelete={handleDelete}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        handleClearAll={handleClearAll}
        currentAnnotation={currentAnnotation}
        handleCancelAnnotation={handleCancelAnnotation}
        exportAnnotations={exportAnnotations}
        exportAsImage={exportAsImage}
        image={image}
      />
    </div>
  );
};

export default Toolbar;
