"use client";
import { Work } from "@/payload-types";
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark, dark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface FileViewerProps {
  fileUrl: string | null | undefined;
  fileName: string | null | undefined;
}

const FileViewer = ({ fileUrl, fileName }: FileViewerProps) => {
  const [fileContent, setFileContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  fileUrl;

  useEffect(() => {
    fetch(fileUrl as string)
      .then((response) => response.text())
      .then((text) => setFileContent(text));
  }, [fileUrl]);
  return (
    <div className="border-4 border-black rounded-lg">
      <div
        style={{
          background: "#333",
          color: "#fff",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={toggleOpen}
      >
        <div className="flex">
          <p>{fileName}</p>
          <p className="ml-auto">{isOpen ? "Hide Code" : "Show Code"}</p>
        </div>
      </div>
      {isOpen && (
        <SyntaxHighlighter
          showLineNumbers={true}
          language="javascript"
          style={a11yDark}
        >
          {fileContent}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default FileViewer;
