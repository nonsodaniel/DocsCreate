import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
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
  const { id: documentId } = useParams();
  console.log(documentId);
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();


  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
   const q = new Quill(editor, {
     theme: "snow",
     modules: {
       toolbar: toolBarOption,
     },
   });
   q.disable();
   q.setText("Document is loading...");
    setQuill(q);
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", document);
  }, [socket, quill, documentId]);

  useEffect(() => {
    const s = io("http://localhost:4000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if(socket == null || quill == null) return 
    const handler =  (delta, oldDelta, source ) =>{
      if(source !== 'user') return;
      socket.emit("send-changes", delta)
    } 
    quill.on('text-change',handler)
    return () =>{
      quill.off("text-change", handler)
    }
  }, [socket, quill])
 
  useEffect(() => {
    if(socket == null || quill == null) return 
    const handler = (delta) =>{
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler);
    return () =>{
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])
  return (
    <div className="container" ref={wrapperRef}>
      Hello
    </div>
  );
};

export default TextEditor;
