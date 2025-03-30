import { useState, useRef } from "react";

const useImage = () => {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
          setImage(e.target.result);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
          setImage(e.target.result);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return {
    image,
    imageRef,
    imageSize,
    handleImageUpload,
    handleDragOver,
    handleDrop,
  };
};

export default useImage;
