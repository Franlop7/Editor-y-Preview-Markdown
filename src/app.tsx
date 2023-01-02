import React, { useCallback, useState } from 'react';
import { Editor } from './editor';
import { Preview } from './preview';
import './app.css';

export const App = () => {
  const [doc, setDoc] = useState<string>('# Empieza a escribir tu codio, en markdown:\n');

  const hadleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  return (
    <div className="app">
      <Editor onChange={hadleDocChange} initialDoc={doc} />
      <Preview doc={doc} />
    </div>
  );
};