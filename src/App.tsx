import MainLayout from "@/components/templates/MainLayout/MainLayout";
import useAnnotation from "@/hooks/useAnnotation";
import useCanvas from "@/hooks/useCanvas";
import useImage from "@/hooks/useImage";

/**
 * Main application component
 */
function App() {
  // Image handling (upload, drag/drop, dimensions)
  const {
    image,
    imageSize,
    handleImageUpload,
    handleDragOver,
    handleDrop,
    error,
    clearError,
  } = useImage();

  // Annotation state and actions
  const {
    annotations,
    setAnnotations,
    currentAnnotation,
    setCurrentAnnotation,
    selectedAnnotation,
    setSelectedAnnotation,
    checkClickOnAnnotation,
    handleDelete,
    handleClearAll,
    handleCancelAnnotation,
  } = useAnnotation();

  // Canvas drawing and interaction
  const {
    mode,
    setMode,
    canvasRef,
    handleCanvasClick,
    handleMouseDown,
    handleMouseMove,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    handleMouseUp,
    exportAnnotations,
    exportAsImage,
  } = useCanvas({
    image,
    annotations,
    setAnnotations,
    currentAnnotation,
    setCurrentAnnotation,
    selectedAnnotation,
    setSelectedAnnotation,
    checkClickOnAnnotation,
    imageSize,
  });

  return (
    <MainLayout
      image={image}
      canvasRef={canvasRef}
      handleCanvasClick={handleCanvasClick}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      handleTouchEnd={handleTouchEnd}
      handleTouchMove={handleTouchMove}
      handleTouchStart={handleTouchStart}
      mode={mode}
      handleImageUpload={handleImageUpload}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      setMode={setMode}
      handleDelete={handleDelete}
      selectedAnnotation={selectedAnnotation}
      annotations={annotations}
      handleClearAll={handleClearAll}
      currentAnnotation={currentAnnotation}
      handleCancelAnnotation={handleCancelAnnotation}
      exportAnnotations={exportAnnotations}
      exportAsImage={exportAsImage}
      error={error}
      clearError={clearError}
    />
  );
}

export default App;
