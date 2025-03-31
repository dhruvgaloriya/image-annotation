# Image Annotation Tool

A responsive web application that allows users to annotate images with polygons and directional arrows. This tool is built with React and provides both desktop and mobile support for image annotation tasks.

## Features

- **Image Upload**: Upload images via file input or drag-and-drop
- **Polygon Annotation**: Create polygon shapes by clicking multiple points
- **Arrow Annotation**: Create directional arrows by defining start and end points
- **Interactive Editing**: Select, move, and resize annotations
- **Responsive Design**: Works on both desktop and mobile devices
- **Export Options**: Export annotations as JSON with relative coordinates or as an annotated image

## Demo

[View Live Demo](https://protexai.netlify.app)

## Screenshot

![Screenshot of the Image Annotation Tool](screenshot.png)

## Video



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dhruvgaloriya/image-annotation.git
   cd image-annotation
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

## Usage Guide

1. **Upload an Image**: Click the "Upload Image" button or drag and drop an image into the designated area.

2. **Choose Annotation Mode**:

   - **Polygon Mode**: Create shapes by clicking multiple points. Complete the polygon by clicking near the starting point.
   - **Arrow Mode**: Click once to set the start point, then click again to set the end point and direction.

3. **Edit Annotations**:

   - Click on an annotation or its points to select it
   - Drag annotation points to resize or reshape
   - Drag the entire annotation to move it
   - Use the "Delete Selected" button to remove the selected annotation

4. **Export Your Work**:
   - **Export JSON**: Exports annotation data in JSON format with coordinates relative to the image dimensions
   - **Export Image**: Exports the image with annotations as a PNG file

## Technical Implementation

### Technology Stack

- **React**: Frontend framework
- **HTML5 Canvas**: For drawing and rendering annotations
- **Typescript**: Core programming language
- **CSS**: Styling with responsive design

### Annotation Data Structure

The annotation data is stored as an array of objects with the following structure:

```javascript
[
  {
    type: "polygon",
    points: [
      { x: 0.1, y: 0.2 },
      { x: 0.3, y: 0.4 },
      { x: 0.5, y: 0.6 },
    ],
  },
  {
    type: "arrow",
    points: [
      { x: 0.1, y: 0.2 },
      { x: 0.3, y: 0.4 },
    ],
  },
];
```

Coordinates are stored as relative values (0-1) to ensure proper scaling across different screen sizes and image dimensions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
