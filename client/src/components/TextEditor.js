import React, { useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
const toolBarOption = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];
const TextEditor = () => {
useEffect(() => {
  const socket = io("http://localhost:4000");

  return () => {
    socket.disconnect();
  };
}, []);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolBarOption,
      },
    });
  }, []);
  return (
    <div className="container" ref={wrapperRef}>
      Hello
    </div>
  );
};

export default TextEditor;
