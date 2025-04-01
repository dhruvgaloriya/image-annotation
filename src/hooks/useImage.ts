import { useState } from "react";

interface UseImageProps {
  // Callback function triggered when a new image is successfully loaded
  onNewImageLoaded?: () => void;
}

/**
 * Custom hook for managing image state and handling image uploads
 *
 * This hook provides functionality for:
 * - Uploading images via file input or drag-and-drop
 * - Validating image file types
 * - Tracking image dimensions
 * - Managing error states
 * - Clearing the current image
 */
const useImage = ({ onNewImageLoaded }: UseImageProps = {}) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [error, setError] = useState<string | null>(null);

  const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

  /**
   * Validates the file type of an uploaded image
   * @param {File} file - The image file to validate
   * @returns {boolean} True if the file is valid, false otherwise
   */
  const validateFile = (file: File): boolean => {
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPG, JPEG, or PNG image.");
      return false;
    }
    return true;
  };

  /**
   * Loads an image file and updates the state
   * @param {File} file - The image file to load
   */
  const loadImage = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        setImage(e.target?.result as string);
        setError(null);
        onNewImageLoaded?.();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadImage(file);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    image,
    imageSize,
    error,
    handleImageUpload,
    handleDragOver,
    handleDrop,
    clearError,
  };
};

export default useImage;
