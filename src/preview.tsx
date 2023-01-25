import React from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import './preview.css';
import './github-markdown.css';

interface Props {
  doc: string;
}

export const Preview: React.FC<Props> = (props) => {
  return (
    <div className="preview markdown-body">
      <ReactMarkdown
        children={props.doc}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};