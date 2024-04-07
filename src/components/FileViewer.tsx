import { Work } from '@/payload-types';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FileViewerProps {
    workItem: Work
}

const FileViewer = ({ workItem }:FileViewerProps) => {

    const validUrls = workItem.workFiles.map(({ }) =>

    ).filter(Boolean) as string[]

  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch(fileUrl)
      .then((response) => response.text())
      .then((text) => setFileContent(text));
  }, [fileUrl]);

  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {fileContent}
    </SyntaxHighlighter>
  );
};

export default FileViewer;