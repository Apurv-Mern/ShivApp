import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles

const Quill = () => {
  const [text, setText] = useState("");
  const [formats, setFormats] = useState({}); // Initialize formats with an empty object

  const quillRef = useRef(null);

  // Function to handle text change
  const handleTextChange = (value) => {
    setText(value);
  };

  // Function to handle format change
  const handleFormatChange = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const currentFormats = editor.getFormat();
      setFormats(currentFormats);
    }
  };

  // React Quill modules with only the toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    // Hook into format change event
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    handleFormatChange();
  }, [text]);

  // Function to apply styles to the custom textarea
  const getTextAreaStyles = () => {
    let styles = {};

    if (formats && formats["bold"]) {
      styles.fontWeight = "bold";
    }

    if (formats && formats["italic"]) {
      styles.fontStyle = "italic";
    }

    if (formats && formats["underline"]) {
      styles.textDecoration = "underline";
    }

    return styles;
  };

  // Convert the object of formats into an array of format keys that are currently active
  const activeFormats = formats
    ? Object.keys(formats).filter((format) => formats[format])
    : [];

  return (
    <div>
      {/* Custom textarea */}
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: text }}
        style={getTextAreaStyles()} // Apply styles from React Quill to the textarea
      />

      {/* React Quill toolbar */}
      <ReactQuill
        theme="snow"
        value={text}
        onChange={handleTextChange}
        modules={modules}
        formats={activeFormats} // Use the array of active formats
        onChangeSelection={handleFormatChange} // Hook into format change event
        ref={quillRef}
      />
    </div>
  );
};

export default Quill;
